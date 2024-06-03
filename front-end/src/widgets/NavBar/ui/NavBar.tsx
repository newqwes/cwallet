import { FC } from "react";
import { useLocation } from "react-router-dom";
import { ROUTING_PATHS } from "../../../shared/consts";
import {
  NavBarWrapper,
  StyledUserOutlined as UserOutlined,
  StyledBarChartOutlined as BarChartOutlined,
  StyledFormatPainterOutlined as FormatPainterOutlined,
} from "./styled";
import { NavButton } from "./NavButton";

export const NavBar: FC = () => {
  const location = useLocation();

  return (
    <NavBarWrapper>
      <NavButton
        key={ROUTING_PATHS.HOME}
        path={ROUTING_PATHS.HOME}
        title="User"
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
    </NavBarWrapper>
  );
};
