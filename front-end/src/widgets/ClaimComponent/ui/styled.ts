import styled, { keyframes } from 'styled-components';
import logoImg from '../../../shared/assets/logo.png';
import mainImg from '../../../shared/assets/main.png';
import { coinFont } from "../../../shared/ui/font.ts";

interface IStyledProp {
  isActive: boolean;
}

export const CoinWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 20vh;
  margin-top: 2vh;
`;

export const Coins = styled.div`
  font-size: 36px;
  ${coinFont};
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 90vw;
`;

export const Logo = styled.div`
  content: '';
  height: 70px;
  width: 70px;
  background-image: url(${logoImg});
  background-size: cover;
  background-position: center;
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
  height: 58vh;
  width: 70vw;
  position: relative;
  transition: 1s ease;

  &:before {
    content: '';
    position: absolute;
    top: -5px;
    left: -5px;
    right: -5px;
    bottom: -5px;
    background-image: url(${mainImg});
    background-size: cover;
    background-position: center;
    transition: 0.5s ease;
    filter: ${({isActive}) => isActive ? 'none' : 'grayscale(80%)'};
    animation: 2s ease-in ${({isActive}) => isActive ? '1.5s infinite' : '0s 0'} ${pressButton};
  }
}
`;

export const Timer = styled.div`
  font-size: 36px;
  margin-top: -5vh;
  font-weight: 700;
  line-height: 44px;
  text-align: center;
  color: #FCD97E;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5); /* Добавление тени к тексту */
`;

export const InvisibleButton = styled.div<IStyledProp>`
  content: '';
  height: 44vh;
  width: 40vw;
  left: 30%;
  background-size: cover;
  background-position: center;

  position: fixed;
  top: 28vh;

  pointer-events: ${({isActive}) => isActive ? 'auto' : 'none'};
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
  top: 110px;
  z-index: 10;
  opacity: 0;
  font-size: 26px;
  animation: ${fadeInCoins} 1.5s ease;
`;

export const LevelBox = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  padding: 6px;
  border: 1px solid rgba(170, 170, 170, 0.82);
  color: rgba(170, 170, 170, 0.82);
  border-radius: 7px;
  font-size: 12px;
  text-align: center;

  h5, p {
    padding: 0;
    margin: 0;
  }
`;
