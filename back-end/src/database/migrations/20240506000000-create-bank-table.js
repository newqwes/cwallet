const MAX_VALUE_BANK = 1000000000000; // 000 x 4

module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('bank', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      value: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
        validate: {
          min: 0,
        },
      },
    });

    await queryInterface.bulkInsert('bank', [{ value: MAX_VALUE_BANK }]);

    await queryInterface.sequelize.query(`
      CREATE OR REPLACE FUNCTION update_bank_value()
      RETURNS TRIGGER AS $$
      BEGIN
        IF TG_OP = 'UPDATE' THEN
          IF NEW.coins > OLD.coins THEN
            UPDATE bank
            SET value = value - (NEW.coins - OLD.coins)
            WHERE id = 1;
          ELSE
            UPDATE bank
            SET value = value + (OLD.coins - NEW.coins)
            WHERE id = 1;
          END IF;
        END IF;
        RETURN NEW;
      END;
      $$ LANGUAGE plpgsql;

      CREATE TRIGGER trigger_update_bank_value
      AFTER UPDATE ON "user"
      FOR EACH ROW
      EXECUTE FUNCTION update_bank_value();
      
      CREATE OR REPLACE FUNCTION notify_bank_update()
      RETURNS TRIGGER AS $$
      BEGIN
        IF NEW.id = 1 THEN
          PERFORM pg_notify('bank_update', NEW.value::text);
        END IF;
        RETURN NEW;
      END;
      $$ LANGUAGE plpgsql;
    
      CREATE TRIGGER bank_update_trigger
      AFTER UPDATE ON bank
      FOR EACH ROW
      EXECUTE FUNCTION notify_bank_update();
      
      ALTER TABLE bank
      ADD CONSTRAINT check_positive_value CHECK (value >= 0);
    `);

    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.sequelize.query(`
        UPDATE "user"
        SET coins = ${MAX_VALUE_BANK} - (SELECT COALESCE(SUM(value), 0) FROM bank WHERE id = 1)
        WHERE coins <> ${MAX_VALUE_BANK} ;
      `, { transaction });

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },

  down: async (queryInterface) => {
    await queryInterface.sequelize.query(`
      DROP TRIGGER IF EXISTS trigger_update_bank_value ON "user";
      DROP FUNCTION IF EXISTS update_bank_value();
    `);

    await queryInterface.dropTable('bank');
  },
};
