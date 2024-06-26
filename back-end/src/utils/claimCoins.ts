import { getRandomInt } from './random';
import {
  MAXIMUM_GET_COINS,
  MAXIMUM_TIME,
  MINIMUM_GET_COINS,
  MINIMUM_TIME,
  SECRET_LEVEL_SMILE
} from '../constants/levels';
import { round } from 'lodash';

const claimLevelFormula = (x: number, y: number, z: number) => {
  const result = 2 * x + (2 * x + y * y) / 20 * y;
  return Math.round(result * z * z);
};

export const getClaimCoins = ({ claimBias, claimInfluence, miningLevel, timeLevel }) => {
  const minClaim = MINIMUM_GET_COINS * miningLevel;
  const maxClaim = MAXIMUM_GET_COINS * miningLevel;
  const coins = getRandomInt(minClaim, maxClaim, claimBias, claimInfluence);
  return {
    min: claimLevelFormula(minClaim, miningLevel, timeLevel),
    max: claimLevelFormula(getRandomInt(minClaim, maxClaim, 1, 1), miningLevel, timeLevel),
    result: claimLevelFormula(coins, miningLevel, timeLevel)
  };
};

const timeLevelFormula = (x: number, y: number): number => {
  return x + (x * y + y * y * y * (y / 2)) / 3 * y;
};

export const getExtraTimeInMinutes = ({ timeBias, timeInfluence, timeLevel }) => {
  const minTime = MINIMUM_TIME * timeLevel;
  const maxTime = MAXIMUM_TIME * timeLevel;
  const extraTime = getRandomInt(minTime, maxTime, timeBias, timeInfluence);

  return {
    min: timeLevelFormula(minTime, timeLevel),
    max: timeLevelFormula(getRandomInt(minTime, maxTime, 1, 1), timeLevel),
    result: timeLevelFormula(extraTime, timeLevel)
  };
};

export const getInfluenceLuck = (minInfluence: number, luckLevel: number): number => {
  if (luckLevel === 1) {
    return minInfluence;
  }
  return minInfluence + luckLevel * 0.02;
};

export const levelUpPrice = ({ price, multiplier, level }) => {
  return round(price + price * (level - 2) + price * multiplier * multiplier * multiplier * (level * level - 4));
};

const formatSeconds = (seconds: number) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);
  if (hours > 0) {
    return `${hours}h`;
  }
  if (minutes > 0) {
    return `${minutes}m`;
  }
  if (secs > 0) {
    return `${secs}s`;
  }
  return '';
};

export const getUpgradeFromToData = ({
                                       name,
                                       claimBias,
                                       luckLevel,
                                       claimInfluence,
                                       miningLevel,
                                       timeLevel,
                                       timeBias,
                                       secretLevel,
                                       timeInfluence
                                     }): string[] | number[] => {

  if (name === 'miningLevel') {
    const nowClaimCoins = getClaimCoins({
      claimBias: getInfluenceLuck(claimBias, luckLevel),
      claimInfluence: getInfluenceLuck(claimInfluence, luckLevel),
      miningLevel: miningLevel,
      timeLevel: timeLevel
    });
    const nextClaimCoins = getClaimCoins({
      claimBias: getInfluenceLuck(claimBias, luckLevel),
      claimInfluence: getInfluenceLuck(claimInfluence, luckLevel),
      miningLevel: miningLevel + 1,
      timeLevel: timeLevel
    });

    return [
      nowClaimCoins.min,
      nextClaimCoins.min,
      nowClaimCoins.max,
      nextClaimCoins.max
    ];
  }

  if (name === 'timeLevel') {
    const nowExtraTimeInSeconds = getExtraTimeInMinutes(
      {
        timeLevel: timeLevel,
        timeBias: getInfluenceLuck(timeBias, luckLevel),
        timeInfluence: getInfluenceLuck(timeInfluence, luckLevel)
      }
    );
    const nextExtraTimeInSeconds = getExtraTimeInMinutes(
      {
        timeLevel: timeLevel + 1,
        timeBias: getInfluenceLuck(timeBias, luckLevel),
        timeInfluence: getInfluenceLuck(timeInfluence, luckLevel)
      }
    );

    return [
      formatSeconds(nowExtraTimeInSeconds.min),
      formatSeconds(nextExtraTimeInSeconds.min),
      formatSeconds(nowExtraTimeInSeconds.max),
      formatSeconds(nextExtraTimeInSeconds.max)
    ];
  }

  if (name === 'luckLevel') {
    return [
      round((getInfluenceLuck(0.5, luckLevel) - 0.5) * 100) + '%',
      round((getInfluenceLuck(0.5, luckLevel + 1) - 0.5) * 100) + '%'
    ];
  }

  if (name === 'secretLevel') {
    return [
      SECRET_LEVEL_SMILE[secretLevel],
      SECRET_LEVEL_SMILE[secretLevel + 1]
    ];
  }
};

export const getReadableName = (name: string) => {
  switch (name) {
    case 'secretLevel':
      return 'Secret';
    case 'luckLevel':
      return 'Luck';
    case 'timeLevel':
      return 'Time';
    case 'miningLevel':
      return 'Earn';
  }
};
