import styled, { keyframes } from 'styled-components';
import { coinFont } from '../../../shared/ui';

const glowing = keyframes`
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

export const Question = styled.h1`
  font-size: 24px;
  color: rgb(200, 200, 200);
  margin-bottom: 15px;
`;

export const CardWrapper = styled.div`
  position: fixed;
  bottom: 18vh;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 25px;
  justify-items: center;
`;

export const AnswerCard = styled.div<{ isFlipped: boolean, isSelected: boolean }>`
  border-radius: 20px;
  font-size: 16px;
  ${coinFont};
  color: #2c1818;
  display: grid;
  align-items: ${({ isFlipped }) => (isFlipped ? 'normal' : 'center')};
  transition: background-color 0.3s ease, box-shadow 0.3s ease, transform 0.6s ease;
  transform-style: preserve-3d;
  transform: ${({ isFlipped }) => (isFlipped ? 'translate(0, 0) rotateY(180deg) scale(1)' : 'rotateY(0)')};
  z-index: ${({ isFlipped }) => (isFlipped ? 100 : 1)};
  position: ${({ isFlipped }) => (isFlipped ? 'fixed' : 'relative')};
  top: ${({ isFlipped }) => (isFlipped ? '15%' : 'initial')};
  left: ${({ isFlipped }) => (isFlipped ? '2%' : 'initial')};
  width: ${({ isFlipped }) => (isFlipped ? '96%' : '160px')};
  height: ${({ isFlipped }) => (isFlipped ? '70%' : '90px')};
  background-color: ${({ isFlipped }) => (isFlipped ? 'rgba(0,0,0,0.98)' : 'rgba(0,0,0,0.41)')};
  border: 1px solid ${({ isSelected }) => (isSelected ? '#f5b53d' : '#fff')};
`;

export const CardFront = styled.div`
  display: flex;
  align-items: center;
  padding: 0 10px;
  text-shadow: none;
`;

export const CoinImage = styled.img`
  width: 42px;
  height: 42px;
  border-radius: 50%;
  margin-right: 10px;
`;

export const CoinInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const CoinName = styled.div`
  font-size: 16px;
  height: 28px;
`;

export const CoinPrice = styled.div`
  font-size: 14px;
`;

export const CardBack = styled.div`
  position: relative;
  backface-visibility: hidden;
  transform: rotateY(180deg);

  ${coinFont};
  font-size: 18px;
  color: hsl(33, 33%, 15%); /* темный оттенок для текста */
  display: grid;
  place-items: center;
  overflow: hidden;
  border-radius: 20px;
  box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 10px 0px,
  rgba(0, 0, 0, 0.5) 0px 2px 25px 0px;

  &:before {
    content: "";
    position: absolute;
    width: 40%;
    height: 150%;
    background: linear-gradient(to right, hsla(40, 100%, 50%, 0.41), hsla(56, 100%, 50%, 0.38), hsla(0, 100%, 50%, 0.45)); /* оранжевый, желтый и зеленый */
    transform-origin: center;
    animation: ${glowing} 5s linear infinite;
  }

  ${CoinImage} {
    width: 76px;
    height: 76px;
    margin: 0 auto;
  }

  ${CoinPrice} {
    margin-top: 20px;
    font-size: 24px;
  }
`;

export const Card = styled.div`
  position: absolute;
  width: 95%;
  height: 95%;
  background: hsl(45, 9%, 9%); /* светло-оранжевый фон */
  border-radius: 20px;
  z-index: 5;
  display: flex;
  align-items: center;
  flex-direction: column;
  text-align: center;
  color: hsl(33, 33%, 15%); /* темный оттенок для текста */
  overflow: hidden;
  cursor: pointer;
  box-shadow: rgba(0, 0, 0, 0.4) 0px 30px 60px -12px inset,
  rgba(0, 0, 0, 0.5) 0px 18px 36px -18px inset;
`;

export const SelectButton = styled.button`
  ${coinFont};
  position: fixed;
  bottom: 10%;
  left: 50%;
  transform: translateX(-50%);
  background-color: hsl(39, 95%, 65%); /* светло-оранжевый фон */
  border: none;
  border-radius: 10px;
  padding: 6px 20px;
  font-size: 5vw;
  color: hsl(0, 0%, 97%); /* темный оттенок для текста */
  cursor: pointer;
  margin-top: 10px;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    background-color: hsl(39, 90%, 60%); /* немного темнее при наведении */
  }

  &:active {
    background-color: hsl(39, 80%, 50%); /* еще темнее при нажатии */
  }
`;

