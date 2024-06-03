import { FC } from "react";
import styled from "styled-components";

const StyledThemeParam = styled.div<any>`
padding: 5px;
margin: 5px;
border: 1px solid #aaa;
border-radius: 5px;
background-color: ${({ backgroundColor }) => backgroundColor};
`;

const StyledThemeItem = styled.div<any>`
color: ${({ color }) => color};
`;

export const TgStyles: FC = () => {
  const tgThemeParams = Object.entries(window.Telegram.WebApp.themeParams);

  return (
    <>
      {tgThemeParams.map(([key, value]) =>
      (<StyledThemeParam backgroundColor={value} key={key}>
        <StyledThemeItem color='white'>{`${key}: ${value}`}</StyledThemeItem>
        <StyledThemeItem color='black'>{`${key}: ${value}`}</StyledThemeItem>
      </StyledThemeParam>
      ))}
    </>
  );
};
