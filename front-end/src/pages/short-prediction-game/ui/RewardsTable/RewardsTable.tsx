import { Container, Level } from './styled.ts';
import { getPlaceIcon } from '../../../../shared/libs';

export const SHORT_GAME_REWARDS = [1000, 800, 600, 400, 200, 0];

export const RewardsTable = ({ level }: { level: number }) => {
  return (
    <Container>
      <div>
        <span>{getPlaceIcon(0)} - {SHORT_GAME_REWARDS[0]}✨</span>
        <span>{getPlaceIcon(1)} - {SHORT_GAME_REWARDS[1]}✨</span>
        <span>{getPlaceIcon(2)} - {SHORT_GAME_REWARDS[2]}✨</span>
      </div>
      <div>
        <span>Your LVL x 2 =</span>
        <Level>x{level * 2}</Level>
      </div>
      <div>
        <span>{getPlaceIcon(3)} - {SHORT_GAME_REWARDS[3]}✨</span>
        <span>{getPlaceIcon(4)} - {SHORT_GAME_REWARDS[4]}✨</span>
        <span>{getPlaceIcon(5)} - Ticket</span>
      </div>
    </Container>
  );
};
