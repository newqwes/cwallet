import styled from 'styled-components';

export const Wrapper = styled.div`
  padding: 2vh 5vh;
  max-height: 85vh;
  overflow: scroll;
`;

export const Title = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const Place = styled.div`
  font-size: 6vw;
  font-weight: 500;
  color: #FCD97E;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5); /* Добавление тени к тексту */
`;

export const CoinCard = styled.div<{ isSelected: boolean }>`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 15px 0;
  padding: 0 10px;
  align-items: center;
  background-color: #fff;
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.75);
  border-radius: 15px;
  border: 3px solid ${(({ isSelected }) => isSelected ? 'hsl(39, 100%, 50%)' : '')};

  * {
    color: #1b1639;
  }
`;

export const CoinCardImg = styled.img`
  height: 38px;
  width: 38px;
  border-radius: 50%;
`;

export const CoinCardNameWrapper = styled.div`
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
`;
export const CoinCardPercent = styled.div<{ positive: boolean }>`
  font-weight: 600;
  font-size: 1.05rem;
  color: ${(({ positive }) => positive ? '#0ECB81' : '#ff3838')};
`;
export const CoinCardPrice = styled.div`
  font-weight: 400;
  font-size: 0.75rem;
  margin-left: 10px;

`;
export const CoinCardChart = styled.div`
`;

