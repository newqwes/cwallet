import { getRandomInt } from "./random";
import { MAXIMUM_GET_COINS, MAXIMUM_TIME, MINIMUM_GET_COINS, MINIMUM_TIME } from "../constants/levels";

export const getClaimCoins = ({claimBias, claimInfluence, miningLevel, timeLevel}): number => {
  const coins = getRandomInt(MINIMUM_GET_COINS, MAXIMUM_GET_COINS, claimBias, claimInfluence);

  const result = coins + (coins + miningLevel * miningLevel) / 5 * miningLevel;

  return Math.round(result + result * timeLevel * 0.2);
}

export const getExtraTimeInMinutes = ({timeBias, timeInfluence, timeLevel}): number => {
  const extraTime = getRandomInt(MINIMUM_TIME, MAXIMUM_TIME, timeBias, timeInfluence);

  return extraTime + (extraTime + timeLevel * timeLevel) / 3 * timeLevel
}
