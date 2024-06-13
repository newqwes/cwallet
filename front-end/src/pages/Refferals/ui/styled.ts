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

  hr {
    margin: 1.5rem 0;
  }
`;

export const MainImg = styled.div`
  background-image: url(${mainImg});
  position: fixed;
  opacity: 0.8;
  content: '';
  width: 60vw;
  height: 60vh;
  z-index: -1;
  background-size: cover;
  background-position: center;

  transform: translateX(85%) rotate(-60deg);
`;

export const RefHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 2vw 0 6vw;
  justify-content: end;
  font-family: "Modern Neon", sans-serif;
  font-weight: normal;
  font-style: normal;
  white-space: nowrap;

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
  font-family: 'Inter', sans-serif;
  width: 41ch;
  font-size: 4vw;
  border-right: 0.08em solid;
  overflow: hidden;
  white-space: nowrap;
  animation: ${typing} 1s steps(11, end),
  ${caret} 0.5s step-end infinite;
`;

export const RefChild = styled.div`
  padding: 5px;
  margin: 5px;
`;

export const RefLinkWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  padding: 5px 20px;
  background: #D9D9D94D;
  font-family: Inter, serif;
  font-size: 16px;
  font-weight: 700;
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
