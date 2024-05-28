import type { ComponentType, JSX } from 'react';
import { MainPage } from '../../pages/main';
import { ShortPredictGame } from '../../pages/short-prediction-game';


interface Route {
  path: string;
  Component: ComponentType;
  title: string;
  icon?: JSX.Element;
}

export const routes: Route[] = [
  { path: '/', Component: MainPage, title: 'Main page' },
  { path: '/short-predict-game', Component: ShortPredictGame, title: 'Predict game' },
];
