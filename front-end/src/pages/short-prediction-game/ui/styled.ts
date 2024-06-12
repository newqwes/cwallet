import styled from 'styled-components';
import { coinFont } from '../../../shared/ui/font.ts';

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
`;

export const CardWrapper = styled.div`
  position: fixed;
  bottom: 20vh;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 25px;
  justify-items: center;
`;

export const AnswerCard = styled.div<{ isFlipped: boolean }>`
  border: none;
  border-radius: 20px;
  padding: 10px;
  font-size: 16px;
  ${coinFont};
  color: #2c1818;
  display: grid;
  align-items: ${({isFlipped}) => (isFlipped ? 'normal' : 'center')};
  transition: background-color 0.3s ease, box-shadow 0.3s ease, transform 0.6s ease;
  transform-style: preserve-3d;
  transform: ${({isFlipped}) => (isFlipped ? 'translate(0, 0) rotateY(180deg) scale(1)' : 'rotateY(0)')};
  z-index: ${({isFlipped}) => (isFlipped ? 100 : 1)};
  position: ${({isFlipped}) => (isFlipped ? 'fixed' : 'relative')};
  top: ${({isFlipped}) => (isFlipped ? '15%' : 'initial')};
  left: ${({isFlipped}) => (isFlipped ? '15%' : 'initial')};
  width: ${({isFlipped}) => (isFlipped ? '70%' : '160px')};
  height: ${({isFlipped}) => (isFlipped ? '70%' : '90px')};
  background-color: ${({isFlipped}) => (isFlipped ? '#D8D8D8F9' : '#F0C14BB5')};

`;

export const CardFront = styled.div`
  backface-visibility: hidden;
  text-align: center;
`;

export const CardBack = styled.div`
  position: relative;
  backface-visibility: hidden;
  transform: rotateY(180deg);

  ${coinFont};
  font-size: 18px;
  color: #2c1818;
`;

export const SelectButton = styled.button`
  ${coinFont};
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  background-color: #F0C14BB5;
  border: none;
  border-radius: 10px;
  padding: 6px 20px;
  font-size: 5vw;
  color: #2c1818;
  cursor: pointer;
  margin-top: 10px;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    background-color: #e2a827;
  }

  &:active {
    background-color: #c69300;
  }
`;
