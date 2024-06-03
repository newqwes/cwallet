import { FC } from "react";
import { INavButton } from "./types";
import {
  ButtonLink,
  LinkTitle,
  StyledLink as Link,
} from "./styled";

export const NavButton: FC<INavButton> = ({ path, title, icon, isActive }) => {
  return (
    <Link to={path}>
      <ButtonLink isActive={isActive} disabled={isActive}>
        {icon}
        <LinkTitle>{title}</LinkTitle>
      </ButtonLink>
    </Link>
  )
};
