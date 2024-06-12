import { FC } from "react";
import styled from "styled-components";

const StyledThemeParam = styled.div<any>`
  padding: 5px;
  border: 1px solid #aaa;
  font-size: 11px;
  font-weight: 700;
  border-radius: 5px;
  background-color: ${({backgroundColor}) => backgroundColor};
`;

const StyledThemeItem = styled.div<any>`
  color: ${({color}) => color};
`;

const Wrapper = styled.div<any>`
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding: 5px;
  gap: 15px;
`;

export const TgStyles: FC = () => {
  const tgThemeParams = Object.entries(window.Telegram.WebApp.themeParams);

  return (
    <Wrapper>
      {tgThemeParams.map(([key, value]) =>
        (<StyledThemeParam backgroundColor={value} key={key}>
            <StyledThemeItem color='white'>{`${key}: ${value}`}</StyledThemeItem>
            <StyledThemeItem color='black'>{`${key}: ${value}`}</StyledThemeItem>
          </StyledThemeParam>
        ))}
    </Wrapper>
  );
};
