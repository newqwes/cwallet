import { Container } from './styled.ts';
import { getPlaceIcon } from '../../../../shared/libs';
import { getReadableCount } from '../../../../shared/libs/toNormalNumber.ts';

export const SHORT_GAME_REWARDS = [1000, 800, 600, 400, 200, 0];

const getShortGameRewards = (level: number) => {
  return SHORT_GAME_REWARDS.map((reward) => getReadableCount(reward * level * 2));
};

export const RewardsTable = ({ level }: { level: number }) => {
  const rewards = getShortGameRewards(level);
  return (
    <Container>
      <div>
        <span>{getPlaceIcon(0)} - {rewards[0]}✨</span>
        <span>{getPlaceIcon(1)} - {rewards[1]}✨</span>
        <span>{getPlaceIcon(2)} - {rewards[2]}✨</span>
      </div>
      <div>
        <span>{getPlaceIcon(3)} - {rewards[3]}✨</span>
        <span>{getPlaceIcon(4)} - {rewards[4]}✨</span>
        <span>{getPlaceIcon(5)} - Ticket</span>
      </div>
    </Container>
  );
};
