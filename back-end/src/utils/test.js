const MINIMUM_GET_COINS = 30;
const MAXIMUM_GET_COINS = 30;

const getRandomInt = (min, max, bias, influence) => {
  const random = Math.random();
  const mix = random * (1 - influence) + bias * influence;
  return Math.floor(min + mix * (max - min + 1));
}

const getClaimCoins = ({ claimBias, claimInfluence, miningLevel, timeLevel }) => {
  const coins = getRandomInt(MINIMUM_GET_COINS, MAXIMUM_GET_COINS, claimBias, claimInfluence);

  const result = coins + (coins + miningLevel * miningLevel) / 5 * miningLevel;

  return Math.round(result + result * timeLevel * 0.2);
}

console.log(getClaimCoins({
  claimBias: 0.5,
  claimInfluence: 0.5,
  miningLevel: 1,
  timeLevel: 1,
}))
