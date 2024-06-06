import styled, { css } from "styled-components";
import { Link } from "react-router-dom";
import { BarChartOutlined, FormatPainterOutlined, UserOutlined, TrophyOutlined } from '@ant-design/icons';

import { IButtonLink } from "./types";

export const NavBarWrapper = styled.div`
position: fixed;
left: 50%;
bottom: 10px;
transform: translateX(-50%);
display: flex;
justify-content: center;
padding: 0.33rem;
border-radius: 0.33rem;
background-color: #e9e9e9;
`;

export const StyledLink = styled(Link)`
text-decoration: none;
`;

export const ButtonLink = styled.button<IButtonLink>`
width: 4rem;
height: 3rem;
border: none;
border-radius: 0.33rem;
display: flex;
flex-direction: column;
justify-content: space-evenly;
align-items: center;
color: ${({ isActive }) => isActive ? '#000000' : '#888888'};
background-color: ${({ isActive }) => isActive ? '#ffffff' : 'inherit'};
`;

export const LinkTitle = styled.span`
font-size: 0.75rem;
font-weight: bold;
`;

const IconBase = css`
font-size: 1.25rem;
`;

export const StyledUserOutlined = styled(UserOutlined)`
${IconBase}
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
