import { Sequelize } from 'sequelize';
import config from './config';

// @ts-ignore
const sequelize = new Sequelize(config.development);

export default sequelize;
