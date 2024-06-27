import styled, { css } from 'styled-components';

export const Wrapper = styled.div`
  max-height: 60vh;
  overflow-y: scroll;
  padding: 0 3vh;
`;

export const Container = styled.div`
  padding: 2vh;
`;

export const CoinCard = styled.div<{ isSelected: boolean }>`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 15px 0;
  padding: 0 0 0 10px;
  align-items: center;
  background-color: #fff;
  border-radius: 15px;
  border: 3px solid ${(({ isSelected }) => isSelected ? 'hsl(27,100%,55%)' : '')};
  position: relative;

  * {
    color: #1b1639;
  }

  ${(({ isSelected }) => isSelected ?
    css`
      &:before, &:after {
        content: "";
        position: absolute;
        z-index: -1;
        width: 20px;
        height: 40px;
        border-radius: 40%;
        background-color: hsl(27, 100%, 55%);
      }

      &:before {
        left: -10px;
      }

      &:after {
        right: -10px;
      }
    `
    : '')}
`;

export const CoinCardImg = styled.img`
  height: 38px;
  width: 38px;
  border-radius: 50%;
`;

export const CoinCardNameWrapper = styled.div`
  width: 74px;
  margin-right: 10px;
`;
export const CoinCardName = styled.div`
  font-weight: 600;
  font-size: 1.05rem;
`;
export const CoinCardShortName = styled.div`
  font-weight: 400;
  font-size: 0.75rem;
  text-transform: uppercase;
`;
export const CoinCardPriceWrapper = styled.div`
  margin-right: 10px;
  width: 50px;
`;
export const CoinCardPercent = styled.div<{ positive: boolean }>`
  font-weight: 600;
  font-size: 1.05rem;
  color: ${(({ positive }) => positive ? '#0ECB81' : '#ff3838')};
`;
export const CoinCardPrice = styled.div`
  font-weight: 400;
  font-size: 0.75rem;
`;
export const CoinCardChart = styled.div`
`;
