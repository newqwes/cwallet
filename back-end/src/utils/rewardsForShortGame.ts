import { SHORT_GAME_REWARDS } from "../constants/levels";

export const getRewardsForShortGame = (level: number, places: number[]) => {
  if (!level || !places || places.length === 0) {
    return {
      totalRewards: 0,
      rewardByPlaces: []
    };
  }

  return places.reduce((acc, place) => {
    const reward = SHORT_GAME_REWARDS[place - 1] * level;
    acc.totalRewards += reward;
    acc.rewardByPlaces.push(reward);
    return acc
  }, {
    totalRewards: 0,
    rewardByPlaces: []
  })
}
