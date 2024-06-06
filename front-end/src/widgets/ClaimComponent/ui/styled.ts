import styled, { keyframes } from 'styled-components';

interface IClaimButton {
  disabled: boolean;
}

const GradientTextAnimation = keyframes`
  0% {
      background-position: 0% 50%;
  }
  50% {
      background-position: 100% 50%;
  }
  100% {
      background-position: 0% 50%;
  }
`;

export const Coins = styled.h1`
margin: 10px;
text-align: center;
font-size: 4em;
font-weight: bold;
color: #000000;
background: linear-gradient(to right, #EE4C55 0%, #A26BA4 50%, #EE4C55 100%);
background-size: 300% auto;
background-clip: text;
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
animation: 6s ${GradientTextAnimation} linear infinite;
`;

export const ClaimButton = styled.button<IClaimButton>`
width: 42vw;
height: 42vw;
color: #ffffff;
background-color: #40a7e3;
box-shadow: inset 0 0 5vw 5vw rgba(255,255,255,0.2);
border: 2vw solid #40a7e3;
border-radius: 50%;
font-size: ${({ disabled }) => (disabled ? '1.5em' : '2.5em')};
opacity: ${({ disabled }) => (disabled ? '0.66' : '1')};
`;

export const Wrapper = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
max-width: 90vw;
`;

export const RefCode = styled.h3`
margin: 10px;
color: #000000;
`;
