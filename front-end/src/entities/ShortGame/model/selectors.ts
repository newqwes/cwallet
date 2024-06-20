import { createSelector } from 'reselect';
import { toNormalNumber } from "../../../shared/libs/toNormalNumber.ts";

const selectShortGame = (state: RootState) => state.shortGame;

export const selectShortGameData = createSelector(
  [selectShortGame],
  ({ gameCoins }) => gameCoins.map((gameCoin) => ({
    ...gameCoin,
    volatility: toNormalNumber(gameCoin.volatility),
    coin_info: {
      ...gameCoin.coin_info,
      current_price: toNormalNumber(gameCoin.coin_info.current_price),
    },
  })),
);

export const selectAlreadyInGame = createSelector(
  [selectShortGame],
  ({ selectedCoinData }) => ({
    place: selectedCoinData?.place,
    game_period: selectedCoinData?.game_period,
    game_ended: selectedCoinData?.game_ended,
    coin_list_id: selectedCoinData?.coin_list_id,
  })
);

export const selectIsActiveGame = createSelector(
  [selectShortGame],
  ({ isActive }) => isActive,
);

export const selectGamePeriod = createSelector(
  [selectShortGame],
  ({ gamePeriod }) => gamePeriod,
);
