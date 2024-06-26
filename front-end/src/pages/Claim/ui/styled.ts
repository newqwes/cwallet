import styled, { keyframes } from 'styled-components';
import mainImg from '../../../shared/assets/main.png';
import { coinFont } from '../../../shared/ui';
import { Timer } from '../../../shared/libs/Timer/styled.ts';

interface IStyledProp {
  isActive: boolean;
}

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const pressButton = keyframes`
  0% {
    transform: scale(1);
  }
  15% {
    transform: scale(0.95);
  }
  20% {
    transform: scale(1);
  }
  35% {
    transform: scale(0.9);
  }
  40% {
    transform: scale(1);
  }
`;

export const MainImg = styled.div<IStyledProp>`
  height: 52vh;
  width: 70vw;
  position: relative;
  transition: 1s ease;

  &:before {
    content: '';
    position: absolute;
    top: 50px;
    left: 20px;
    right: 20px;
    bottom: 30px;
    background-image: url(${mainImg});
    background-size: cover;
    background-position: center;
    transition: 0.5s ease;
    filter: ${({ isActive }) => isActive ? 'none' : 'grayscale(80%)'};
    animation: 2s ease-in ${({ isActive }) => isActive ? '1.5s infinite' : '0s 0'} ${pressButton};
  }
}
`;

export const InvisibleButton = styled.div<IStyledProp>`
  content: '';
  height: 40vh;
  width: 35vw;
  left: 30%;
  background-size: cover;
  background-position: center;

  position: fixed;
  top: 17vh;

  pointer-events: ${({ isActive }) => isActive ? 'auto' : 'none'};
`;

const fadeInCoins = keyframes`
  0% {
    opacity: 0;
    transform: translateY(0);
  }
  50% {
    opacity: 0.7;
    transform: translateY(40%);
  }
  100% {
    opacity: 0;
    transform: translateY(0);
  }
`;

export const CoinChangeText = styled.div<IStyledProp>`
  ${coinFont};
  position: absolute;
  top: 8.5vh;
  z-index: 10;
  opacity: 0;
  font-size: 5vw;
  animation: ${fadeInCoins} 2.5s ease;
`;

export const VersionBox = styled.div`
  position: absolute;
  bottom: 65px;
  left: 30px;
  color: rgba(170, 170, 170, 0.82);
  font-size: 12px;
`;

export const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;

  ${Timer} {
    margin-top: -4vh;
  }
`;

export const UpgradeButtonWrapper = styled.div`
  position: absolute;
  bottom: 20vh;
  width: 80vw;
  display: flex;
  justify-content: center;
  margin-top: 10px;
`;
