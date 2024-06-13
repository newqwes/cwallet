import { FC } from "react";
import { INavButton } from "./types";
import {
  ButtonLink,
  LinkTitle,
  StyledLink as Link,
} from "./styled";
import { vibrateNow } from "../../../shared/libs/vibration.ts";

export const NavButton: FC<INavButton> = ({path, title, icon, isActive}) => {
  return (
    <Link to={path}>
      <ButtonLink isActive={isActive} disabled={isActive} onClick={() => {
        vibrateNow('success', 'impact', 'light')
      }}>
        {icon}
        <LinkTitle>{title}</LinkTitle>
      </ButtonLink>
    </Link>
  )
};
