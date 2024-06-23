import CoinListService from '../services/coinListService';
import LongGameService from '../services/longGameService';
import ApiError from '../exceptions/apiError';
import formatDate from '../utils/longGameFormatDate';
import { CustomNextFunction, CustomRequest, CustomResponse } from '../models';

export const sendUserCryptoBag = async (req: CustomRequest, res: CustomResponse, next: CustomNextFunction) => {
  try {
    const user = req.user;
    const start_date = new Date();
    const finish_date = new Date(start_date);
    finish_date.setDate(finish_date.getDate() + 3);
    const formated_start_date = formatDate(start_date);
    const formated_finish_date = formatDate(finish_date);

    const cryptoBag = req.body?.crypto_bag;

    if (Object.keys(cryptoBag).length === 0) {
      return next(ApiError.BadRequest('The crypto bag is empty'));
    }

    for (const key in cryptoBag) {
      const coin_list_el = await CoinListService.findOneByCoinId(key);
      if (!coin_list_el) {
        return next(ApiError.NotFound('Coin not found by coin_id'));
      }
      const coin_el = coin_list_el.toJSON();

      const coin_count = cryptoBag[key];
      if (coin_count <= 0) {
        return next(
          ApiError.BadRequest(
            'Coin_count lesses than or equal to 0. Send a valid coin count'
          )
        );
      }

      const long_game_note = await LongGameService.findOneNoteLongGame(
        user.id,
        coin_el.id,
        formated_start_date
      );
      if (long_game_note) {
        return next(
          ApiError.BadRequest(
            'This user is already taking part in the Long Game'
          )
        );
      } else {
        await LongGameService.create({
          userId: user.id,
          coin_list_id: coin_el.id,
          coin_count,
          start_date: formated_start_date,
          finish_date: formated_finish_date,
          start_price: coin_el.current_price
        });
      }
    }

    return res.status(201).json({ success: true });
  } catch (e) {
    next(e);
  }
};
