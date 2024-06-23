import CoinListService from '../services/coinListService';
import { CustomNextFunction, CustomRequest, CustomResponse } from '../models';

export const getCoinInfo = async (req: CustomRequest, res: CustomResponse, next: CustomNextFunction) => {
  try {
    const { id } = req.params;
    const result = await CoinListService.findOneById(id);
    return res.status(201).json({ result });
  } catch (e) {
    next(e);
  }
};
