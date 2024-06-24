import Level from '../database/models/level';
import createResponse from '../utils/createResponse';

class LevelService {
  async findAll(): Promise<Level[]> {
    try {
      return await Level.findAll();
    } catch (error) {
      createResponse(404, 'Server Error LevelService findAll', error);
    }
  }

  async findOneByName(name: string): Promise<Level> {
    try {
      return await Level.findOne({ where: { name } });
    } catch (error) {
      createResponse(404, 'Server Error LevelService findOneByName', error);
    }
  }
}

export default new LevelService();
