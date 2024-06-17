import styled, { css } from "styled-components";
import { Link } from "react-router-dom";
import {
  BarChartOutlined,
  FormatPainterOutlined,
  TrophyOutlined,
  UsergroupAddOutlined,
} from '@ant-design/icons';

import logoImg from '../../../shared/assets/logo.png';
import { IButtonLink } from "./types";

export const NavBarWrapper = styled.div`
  position: fixed;
  left: 50%;
  bottom: 15px;
  transform: translateX(-50%);
  align-items: center;
  display: flex;
  justify-content: space-between;
  gap: 5px;
`;

export const StyledLink = styled(Link)`
  text-decoration: none;
`;

export const ButtonLink = styled.button<IButtonLink>`
  width: 14vw;
  height: 13.5vw;
  border: none;
  border-radius: 0.33rem;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  color: #FFFFFF;

  background: ${({ isActive }) => (isActive ? '#D9D9D96F' : '#D9D9D940')};
`;

export const LinkTitle = styled.span`
  font-size: 0.75rem;
  font-weight: bold;
`;

const IconBase = css`
  font-size: 1.25rem;
`;

export const StyledTapIcon = styled.div<IButtonLink>`
  content: '';
  height: 17vw;
  width: 17vw;
  margin: 0 15px;
  background-image: url(${logoImg});

  transition: filter 0.5s ease;
  filter: ${({ isActive }) => (isActive ? 'grayscale(0%)' : 'grayscale(100%)')};
  background-size: cover;
  background-position: center;

`;
export const StyledBarChartOutlined = styled(BarChartOutlined)`
  ${IconBase}
`;
export const StyledFormatPainterOutlined = styled(FormatPainterOutlined)`
  ${IconBase}
`;
export const StyledUsersOutlined = styled(TrophyOutlined)`
  ${IconBase}
`;
export const StyledUsergroupAddOutlined = styled(UsergroupAddOutlined)`
  ${IconBase}
`;
