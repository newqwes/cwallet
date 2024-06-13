import styled, { css } from 'styled-components';

const contentStyle = css`
  width: 100%;
  height: 100%;
  position: absolute;
  backface-visibility: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #F0C14B;
  border-radius: 0.2em;
  box-shadow: 0.05em 0.05em 0.05em 0.05em rgba(0, 0, 0, 0.1);
  font-size: 3em;
  color: white;
`;

export const Wrapper = styled.div`
  padding: 4vh 2vh;
  text-align: center;
`;

export const GameBoard = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  justify-items: center;
  gap: 1em;
`;

export const CardInner = styled.div<any>`
  width: 100%;
  height: 100%;
  position: relative;
  transform-style: preserve-3d;
  transition: transform 0.5s;
  transform: ${props => props.isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'};
`;

export const CardFront = styled.div<any>`
  ${contentStyle};
`;

export const CardBack = styled.div<any>`
  ${contentStyle};
  transform: rotateY(180deg);
`;

export const Card = styled.div<any>`
  width: 24vw;
  height: 10vh;
  perspective: 60em;
  cursor: pointer;
`;

export const VictoryMessage = styled.h2<{ isVictory: boolean }>`
  color: white;
  margin: 6vh 0;
  font-size: 4vh;
  opacity: ${({isVictory}) => isVictory ? '1' : '0'};
`;
