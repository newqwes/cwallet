import styled, { keyframes } from "styled-components";
import mainImg from '../../../shared/assets/main.png';

const buzz = keyframes`
  70% {
    opacity: 0.8;
  }
`;

const blink = keyframes`
  40% {
    opacity: 1;
  }
  42% {
    opacity: 0.8;
  }
  43% {
    opacity: 1;
  }
  45% {
    opacity: 0.2;
  }
  46% {
    opacity: 1;
  }
`;

const typing = keyframes`
  from {
    width: 0;
  }
`;

const caret = keyframes`
  50% {
    border-color: transparent;
  }
`;

export const Wrapper = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: column;
  height: 86vh;
`;

export const ReferralsContainer = styled.div`
  margin-top: 25px;
  border: 1px solid #fff;
  border-radius: 30px;
  flex-grow: 1;
  position: relative;
  overflow: hidden;
`;

export const MainImg = styled.div`
  background-image: url(${mainImg});
  position: absolute;
  opacity: 0.7;
  content: '';
  width: 60vw;
  height: 60vh;
  top: 0;
  right: 0;
  z-index: -1;
  background-size: cover;
  background-position: center;
  transform: translateX(20%) translateY(10%) rotate(-50deg);
`;

export const RefHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 2vw 0 6vw;

  div {
    backface-visibility: hidden;
    will-change: opacity;
  }
`;

export const Title = styled.div`
  margin-right: 5vw;
  font-size: 6vw;
  color: #d4eaff;
  text-shadow: 0 0 0 transparent,
  0 0 10px #2695ff,
  0 0 20px rgba(38, 149, 255, 0.5),
  0 0 40px #2695ff,
  0 0 100px #2695ff,
  0 0 200px #2695ff,
  0 0 300px #2695ff,
  0 0 500px #2695ff;
  animation: ${buzz} 0.01s infinite alternate;
`;

export const RefCode = styled.div`
  color: #ffd9e2;
  font-size: 8vw;
  text-shadow: 0 0 0 transparent,
  0 0 10px #ff003c,
  0 0 20px rgba(255, 0, 60, 0.5),
  0 0 40px #ff003c,
  0 0 100px #ff003c,
  0 0 200px #ff003c,
  0 0 300px #ff003c,
  0 0 500px #ff003c,
  0 0 1000px #ff003c;
  animation: ${blink} 4s infinite alternate;
`;

export const Description = styled.div`
  width: 40ch;
  font-size: 4.4vw;
  font-weight: 500;
  border-right: 0.4em solid;
  overflow: hidden;
  white-space: nowrap;
  animation: ${typing} 2.5s steps(6, end) 3,
  ${caret} 0.5s step-end infinite;
`;

export const RefChild = styled.div`
  padding: 15px;
  margin: 5px 0;
  width: 100%;
  border: 1px solid #ffffff;
  display: flex;
  justify-content: space-between;
`;

export const RefCoins = styled.div`

`;

export const RefName = styled.div`

`;

export const RefLinkWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  padding: 5px 20px;
  background: #D9D9D94D;
  font-size: 16px;
  font-weight: 600;
  line-height: 20px;
  text-align: center;
  border-radius: 10px;
`;

export const RefLink = styled.div`
  font-size: 18px;
  line-height: 24px;
  height: 32px;
  padding: 3px 8px;
  cursor: pointer;
  border: 1px solid #aaa;
  border-radius: 5px;
`;

export const TabWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: hsl(217, 78%, 51%);
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  border-bottom: 1px solid #ccc;
  margin-bottom: 20px;
`;

export const Tab = styled.div<{ isActive: boolean }>`
  padding: 15px 45px;
  cursor: pointer;
  font-weight: 600;
  font-size: 3.5vw;
  color: hsl(210, 29%, 97%);
  background-color: ${props => props.isActive ? 'hsl(39, 100%, 50%)' : 'hsl(217,78%,51%)'};
  transition: background-color 0.3s;
  border-radius: 30px 30px 0 0;
`;
