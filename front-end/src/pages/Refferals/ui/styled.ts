import styled from "styled-components";
import { coinFont } from "../../../shared/ui/font.ts";
import mainImg from '../../../shared/assets/main.png';


export const Wrapper = styled.div`
  padding: 10px;

  hr {
    margin: 1.5rem 0;
  }
`;
export const MainImg = styled.div`
  background-image: url(${mainImg});
  position: fixed;
  opacity: 0.3;
  content: '';
  width: 60vw;
  height: 60vh;
  z-index: -1;
  background-size: cover;
  background-position: center;

  transform: translateX(85%) rotate(-60deg);
`;

export const RefHeader = styled.div`
  ${coinFont};

  margin-bottom: 20px;
  font-weight: 500;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const RefChild = styled.div`
  padding: 5px;
  margin: 5px;
`;

export const Title = styled.h2`
  font-size: 24px;
  margin-bottom: 10px;
  font-weight: 900;
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


export const RefCode = styled.h2`
  ${coinFont};
  font-size: 24px;
  color: #d82ed8;

  cursor: pointer;
  padding: 0 14px;
  border: 1px solid #aaa;
  border-radius: 5px;
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
