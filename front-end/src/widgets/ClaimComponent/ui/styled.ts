import styled, { keyframes } from 'styled-components';
import mainImg from '../../../shared/assets/main.png';
import { coinFont } from "../../../shared/ui/font.ts";

interface IStyledProp {
  isActive: boolean;
}

export const CoinWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 10vh;
  margin-top: 1vh;

  h1 {
    color: rgb(200, 200, 200);
    font-size: 5vw;
    padding: 0;
    margin: 0.4vh 0;
  }
`;

export const Coins = styled.div`
  font-size: 6vw;
  ${coinFont};
`;

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
  font-size: 7vw;
  margin-top: -6vh;
  font-weight: 700;
  text-align: center;
  height: 20px;
  color: #FCD97E;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5); /* Добавление тени к тексту */
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
  top: 8vh;
  z-index: 10;
  opacity: 0;
  font-size: 5vw;
  animation: ${fadeInCoins} 1.5s ease;
`;

export const VersionBox = styled.div`
  position: absolute;
  bottom: 65px;
  left: 30px;
  color: rgba(170, 170, 170, 0.82);
  font-size: 12px;
`;

export const UpgradeButton = styled.button`
  background-color: hsl(39, 100%, 50%); /* оранжевый */
  color: hsl(40, 33%, 15%);
  border: 0;
  border-radius: 0.5em;
  padding: 1em;
  font-size: 4vw;
  font-weight: 700;
  text-transform: uppercase;
  line-height: 1;
  cursor: pointer;
  box-shadow: 0 0.35em 0 0 hsl(39, 100%, 50%, 0.5);

  &:active {
    transform: translateY(0.35em);
    box-shadow: none;
  }

  &:focus-visible {
    transform: translateY(0.35em);
    box-shadow: none;
  }
`;


export const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const UpgradeButtonWrapper = styled.div`
  position: absolute;
  bottom: 20vh;
  width: 80vw;
  display: flex;
  justify-content: center;
  margin-top: 10px;
`;
