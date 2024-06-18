import { createSelector } from 'reselect';
import { toNormalNumber } from "../../../shared/libs/toNormalNumber.ts";

const selectShortGame = (state: RootState) => state.shortGame;

export const selectShortGameData = createSelector(
  [selectShortGame],
  (referrals) => referrals.data.map((shortGame) => ({
    ...shortGame,
    coin_info: { ...shortGame.coin_info, current_price: toNormalNumber(shortGame.coin_info.current_price) },
  })),
);

export const selectAlreadyInGame = createSelector(
  [selectShortGame],
  (referrals) => ({
    place: referrals.place,
    game_period: referrals.game_period,
    game_ended: referrals.game_ended,
  })
);
