import type { ComponentType, JSX } from 'react';
import { MainPage } from '../../pages/main';
import { UsersPage } from '../../pages/users';
import { ShortPredictGame } from '../../pages/short-prediction-game';
import { TgStyles } from '../../pages/TgStyles';
import { ROUTING_PATHS } from '../../shared/consts';


interface Route {
  path: string;
  Component: ComponentType;
  title: string;
  icon?: JSX.Element;
}

export const routes: Route[] = [
  { path: ROUTING_PATHS.HOME, Component: MainPage, title: 'Main page' },
  { path: ROUTING_PATHS.SHORT_PREDICTION_GAME, Component: ShortPredictGame, title: 'TgStyles' },
  { path: ROUTING_PATHS.TG_STYLES, Component: TgStyles, title: 'Predict game' },
  { path: ROUTING_PATHS.USERS, Component: UsersPage, title: 'Людня, вся кароч..' },
];
