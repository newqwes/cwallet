import type { ComponentType, JSX } from 'react';
import { ClaimPage } from '../../pages/Claim';
import { UsersPage } from '../../pages/Users';
import { ShortPredictGame } from '../../pages/ShortGame';
import { GameBoard } from '../../pages/GameBoard';
import { TasksPage } from '../../pages/Tasks';
import { Referrals } from '../../pages/Refferals';
import { Upgrade } from '../../pages/Upgrade';
import { ROUTING_PATHS } from '../../shared/consts';

interface Route {
  path: string;
  Component: ComponentType;
  title: string;
  icon?: JSX.Element;
}

export const routes: Route[] = [
  { path: ROUTING_PATHS.HOME, Component: ClaimPage, title: 'Main page' },
  { path: ROUTING_PATHS.SHORT_PREDICTION_GAME, Component: ShortPredictGame, title: 'Short' },
  { path: ROUTING_PATHS.GAME_BOARD, Component: GameBoard, title: 'Temp Game' }, // temporarily unavailable
  { path: ROUTING_PATHS.TASKS, Component: TasksPage, title: 'Tasks' },
  { path: ROUTING_PATHS.USERS, Component: UsersPage, title: 'Users' },
  { path: ROUTING_PATHS.REFERRALS, Component: Referrals, title: 'Friends' },
  { path: ROUTING_PATHS.UPGRADE, Component: Upgrade, title: 'Upgrade' }
];
