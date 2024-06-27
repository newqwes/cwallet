import styled from 'styled-components';
import { coinFont } from '../font.ts';

export const CoinWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 10vh;
  margin-top: 1vh;

  h1 {
    color: rgb(200, 200, 200);
    font-size: 5.3vw;
    font-weight: 600;
    padding: 0;
    margin: 0.4vh 0 0;
  }

  span {
    padding: 0;
    margin: 0 0 0.5vh;
    font-size: 2vw;
  }
`;

export const Coins = styled.div`
  font-size: 6vw;
  ${coinFont};
`;

