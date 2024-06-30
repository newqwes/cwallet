import styled from 'styled-components';

export const UpgradeContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  position: relative;
`;

export const Cards = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px 15px;
  justify-content: space-between;
  margin-top: 10vh;
  align-items: center;
  padding: 0 15px;
`;


export const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 25px;

  div {
    font-weight: 600;
    font-size: 28px;
    margin-bottom: 10px;
  }
`;

export const CardWrapper = styled.div`
  display: grid;
  border-radius: 10px;
  background-color: rgba(0, 0, 0, 0.32);
  padding: 5px;
`;

export const CardTop = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr;
  border-bottom: 1px solid rgba(255, 255, 255, 0.25);
`;

export const CardBottom = styled.div`
  display: grid;
  grid-template-columns: 1.5fr 3fr;
  align-items: center;
  padding: 4px 0;
`;

export const ImgWrapper = styled.div`
  img {
    margin: 8px 5px;
    border-radius: 50%;
    width: 60px;
  }
`;

export const TopText = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5px;
  text-align: left;
`;

export const TopTitle = styled.span`
  margin-bottom: 10px;
  font-size: 0.9rem;
  font-weight: 400;
`;

export const TopDesc = styled.span`
  font-size: 0.7rem;
  color: rgba(255, 255, 255, 0.35);
  font-weight: 300;
`;

export const TopProfit = styled.span`
`;
export const BottomLevel = styled.span`
  border-right: 1px solid rgba(255, 255, 255, 0.25);
`;
export const BottomPrice = styled.span`
  text-align: left;
  margin-left: 10px;
`;

export const LevelModal = styled.div<{ hide: boolean }>`
  display: ${({ hide }) => hide ? 'none' : 'block'};
  position: fixed;
  width: 100%;
  box-shadow: 0 0 20px 10px rgba(255, 255, 255, 0.5); // This adds a white glowing shadow
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  background-color: #20232b;
  bottom: 0;
  z-index: 1000;
  padding: 30px 10px;

  h1 {
    padding: 0;
    margin: 0;
  }

  img {
    margin: 0;
    width: 80px;
  }

  .anticon {
    position: absolute;
    font-size: 28px;
    right: 20px;
    top: 20px;

    svg {
      color: rgba(255, 255, 255, 0.24);
    }
  }
`;
