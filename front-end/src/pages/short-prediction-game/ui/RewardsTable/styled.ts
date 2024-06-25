import styled from 'styled-components';
import { coinFont } from '../../../../shared/ui';

export const Container = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;

  div {
    display: flex;
    flex-direction: column;
  }
`;

export const Level = styled.span`
  ${coinFont};
  text-shadow: none;
  font-size: 7vw;
  text-align: center;
  letter-spacing: 1vw;
`;
