import { FC } from "react";
import { useLocation } from "react-router-dom";
import { ROUTING_PATHS } from "../../../shared/consts";
import {
  NavBarWrapper,
  StyledUserOutlined as UserOutlined,
  StyledBarChartOutlined as BarChartOutlined,
  StyledFormatPainterOutlined as FormatPainterOutlined,
  StyledUsersOutlined as UsersOutlined,
  StyledUsergroupAddOutlined as UsergroupAddOutlined,
} from './styled';
import { NavButton } from "./NavButton";

export const NavBar: FC = () => {
  const location = useLocation();

  return (
    <NavBarWrapper>
      <NavButton
        key={ROUTING_PATHS.HOME}
        path={ROUTING_PATHS.HOME}
        title="Main"
        icon={<UserOutlined />}
        isActive={location.pathname === ROUTING_PATHS.HOME}
      />
      <NavButton
        key={ROUTING_PATHS.SHORT_PREDICTION_GAME}
        path={ROUTING_PATHS.SHORT_PREDICTION_GAME}
        title="Short"
        icon={<BarChartOutlined />}
        isActive={location.pathname === ROUTING_PATHS.SHORT_PREDICTION_GAME}
      />
      <NavButton
        key={ROUTING_PATHS.TG_STYLES}
        path={ROUTING_PATHS.TG_STYLES}
        title="tgStyles"
        icon={<FormatPainterOutlined />}
        isActive={location.pathname === ROUTING_PATHS.TG_STYLES}
      />
      <NavButton
        key={ROUTING_PATHS.USERS}
        path={ROUTING_PATHS.USERS}
        title="Users"
        icon={<UsersOutlined />}
        isActive={location.pathname === ROUTING_PATHS.USERS}
      />
      <NavButton
        key={ROUTING_PATHS.REFERRALS}
        path={ROUTING_PATHS.REFERRALS}
        title="Friends"
        icon={<UsergroupAddOutlined />}
        isActive={location.pathname === ROUTING_PATHS.REFERRALS}
      />
    </NavBarWrapper>
  );
};
