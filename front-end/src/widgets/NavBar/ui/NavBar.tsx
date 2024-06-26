import { FC } from 'react';
import { useLocation } from 'react-router-dom';
import { ROUTING_PATHS } from '../../../shared/consts';
import {
  NavBarWrapper,
  StyledTapIcon,
  StyledBarChartOutlined as BarChartOutlined,
  StyledUsersOutlined as UsersOutlined,
  StyledUsergroupAddOutlined as UsergroupAddOutlined, StyledLink as Link,
  StyledOrderedListOutlined
} from './styled';

import { NavButton } from './NavButton';
import { vibrateNow } from '../../../shared/libs/vibration.ts';

export const NavBar: FC = () => {
  const location = useLocation();

  return (
    <NavBarWrapper>
      <NavButton
        key={ROUTING_PATHS.REFERRALS}
        path={ROUTING_PATHS.REFERRALS}
        title="Friends"
        icon={<UsergroupAddOutlined/>}
        isActive={location.pathname === ROUTING_PATHS.REFERRALS}
      />
      {/*<NavButton*/}
      {/*  key={ROUTING_PATHS.GAME_BOARD}*/}
      {/*  path={ROUTING_PATHS.GAME_BOARD}*/}
      {/*  title="Game"*/}
      {/*  icon={<FormatPainterOutlined/>}*/}
      {/*  isActive={location.pathname === ROUTING_PATHS.GAME_BOARD}*/}
      {/*/>*/}
      <NavButton
        key={ROUTING_PATHS.TASKS}
        path={ROUTING_PATHS.TASKS}
        title="Tasks"
        icon={<StyledOrderedListOutlined/>}
        isActive={location.pathname === ROUTING_PATHS.TASKS}
      />
      <Link to={ROUTING_PATHS.HOME}>
        <StyledTapIcon isActive={location.pathname === ROUTING_PATHS.HOME} onClick={() => {
          vibrateNow('success', 'impact', 'light');
        }}/>
      </Link>
      <NavButton
        key={ROUTING_PATHS.SHORT_PREDICTION_GAME}
        path={ROUTING_PATHS.SHORT_PREDICTION_GAME}
        title="Short"
        icon={<BarChartOutlined/>}
        isActive={location.pathname === ROUTING_PATHS.SHORT_PREDICTION_GAME}
      />
      <NavButton
        key={ROUTING_PATHS.USERS}
        path={ROUTING_PATHS.USERS}
        title="Users"
        icon={<UsersOutlined/>}
        isActive={location.pathname === ROUTING_PATHS.USERS}
      />
    </NavBarWrapper>
  );
};
