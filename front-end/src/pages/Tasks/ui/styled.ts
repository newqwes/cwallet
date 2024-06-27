import styled, { keyframes } from 'styled-components';
import { ITaskNames } from '../../../entities/Tasks/type/response.type.ts';
import subscribe_to_x from '../../../shared/assets/twitter.svg';
import coin_reward from '../../../shared/assets/coin_reward.svg';
import subscribe_to_channel from '../../../shared/assets/telegram.svg';
import invite_friend from '../../../shared/assets/one_fren.svg';
import invite_three_friends from '../../../shared/assets/three_fren.svg';
import { Button } from '../../../shared/ui';
import { CheckCircleOutlined as CheckCircleOutlinedAnt } from '@ant-design/icons';


const iconNames = {
  'subscribe_to_x': subscribe_to_x,
  'subscribe_to_channel': subscribe_to_channel,
  'subscribe_to_chat': subscribe_to_channel,
  'invite_friend': invite_friend,
  'invite_three_friends': invite_three_friends,
  'accumulate_30000_coins': coin_reward,
};

export const Wrapper = styled.div`
  padding: 0 10px;
`;

export const Tasks = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 40px;
  overflow-y: scroll;
  max-height: 65vh;
`;

export const TaskWrapper = styled.div`
  display: grid;
  grid-template-columns: 60px auto 55px;
  align-items: center;
  margin-bottom: 2vh;
  background-color: rgba(0, 0, 0, 0.17);
  padding: 5px 8px;
  border-radius: 10px;

  ${Button} {
    min-height: 30px;
    padding: 2px;
    font-size: 0.9rem;
    text-transform: none;
    font-weight: 500;
    margin-bottom: 6px;
    margin-right: 5px;
  }
`;

export const Icon = styled.div<{ iconName: ITaskNames }>`
  width: 50px;
  height: 50px;
  background-image: url(${({ iconName }) => iconNames[iconName]});
  background-size: cover;
  border-radius: 50%;
`;

export const TextWrapper = styled.div`

`;

export const Text = styled.div`
  font-size: 1rem;
`;

export const Reward = styled.div`
  font-size: 0.8rem;
`;

const loading = keyframes`
  20% {
    background-position: 0 0, 50% 50%, 100% 50%;
  }
  40% {
    background-position: 0 100%, 50% 0, 100% 50%;
  }
  60% {
    background-position: 0 50%, 50% 100%, 100% 0;
  }
  80% {
    background-position: 0 50%, 50% 50%, 100% 100%;
  }
`;

export const Loader = styled.div`
  width: 20px;
  aspect-ratio: 2;
  margin: 0 auto;
  background: no-repeat radial-gradient(circle closest-side, #f3f3f3 90%, #0000) 0 50%,
  no-repeat radial-gradient(circle closest-side, #f3f3f3 90%, #0000) 50% 50%,
  no-repeat radial-gradient(circle closest-side, #f3f3f3 90%, #0000) 100% 50%;
  background-size: calc(100% / 3) 50%;
  animation: ${loading} 1s infinite linear;
`;

export const CheckCircleOutlined = styled(CheckCircleOutlinedAnt)`
  margin: 0 auto;
  font-size: 1.3rem;
`;
