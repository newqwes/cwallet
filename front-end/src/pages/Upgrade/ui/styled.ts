import styled from 'styled-components';
import { Button } from "../../../shared/ui";


export const UpgradeContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;

  overflow: scroll;
  height: 85vh;

`;

export const TitleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 15px 25px;

  div {
    font-weight: 600;
    font-size: 28px;
  }
`;

export const CardWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  margin: 15px auto;
  width: 95%;
  border-radius: 15px;
  border: 1px #ccc solid;
  padding: 12px 20px 2px;
  font-size: 17px;
  background-color: rgba(0, 0, 0, 0.21);
`;

export const RowWrapper = styled.div`
  display: grid;
  grid-template-columns: 3fr 3fr 2fr;
  align-items: center;
  margin-bottom: 1.5vh;
  text-align: left;
`;


export const CurrentCardTitle = styled.div`
`;

export const CurrentCardRate = styled.div`
  text-align: center;
`;

export const CardPrice = styled.div`
  text-align: right;
`;

export const NewCardTitle = styled.div`
`;

export const NewCardRate = styled.div`
  text-align: center;
`;

export const CardButton = styled.div`
  text-align: right;

  ${Button} {
    padding: 2px 16px;
    margin-bottom: 4px;
    margin-right: 5px;
  }
`;
