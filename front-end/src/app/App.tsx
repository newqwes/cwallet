import { FC, useEffect, useMemo } from 'react';
import {
  bindMiniAppCSSVars,
  bindThemeParamsCSSVars,
  bindViewportCSSVars,
  initNavigator,
  useLaunchParams,
  useMiniApp,
  useThemeParams,
  useViewport,
} from '@tma.js/sdk-react';
import { AppRoot } from '@telegram-apps/telegram-ui';
import { useIntegration } from '@tma.js/react-router-integration';
import { Navigate, Route, Router, Routes } from 'react-router-dom';
import { routes } from './config/router';

import '@telegram-apps/telegram-ui/dist/styles.css';
import { NavBar } from '../widgets/NavBar';

export const App: FC = () => {
  const lp = useLaunchParams();
  const miniApp = useMiniApp();
  const themeParams = useThemeParams();
  const viewport = useViewport();

  useEffect(() => {
    return bindMiniAppCSSVars(miniApp, themeParams);
  }, [miniApp, themeParams]);

  useEffect(() => {
    return bindThemeParamsCSSVars(themeParams);
  }, [themeParams]);

  useEffect(() => {
    return viewport && bindViewportCSSVars(viewport);
  }, [viewport]);

  useEffect(() => {
    window.Telegram.WebApp.expand();
  }, [window.Telegram.WebApp]);

  // Create new application navigator and attach it to the browser history, so it could modify
  // it and listen to its changes.
  const navigator: any = useMemo(() => initNavigator('app-navigation-state'), []);
  const [location, reactNavigator] = useIntegration(navigator);

  // Don't forget to attach the navigator to allow it to control the BackButton state as well
  // as browser history.
  useEffect(() => {
    navigator.attach();
    return () => navigator.detach();
  }, [navigator]);


  return (
    <AppRoot
      appearance={miniApp.isDark ? 'dark' : 'light'}
      platform={['macos', 'ios'].includes(lp.platform) ? 'ios' : 'base'}
      style={{
        paddingBottom: '55px',
      }}
    >
      <Router location={location} navigator={reactNavigator}>
        <Routes>
          {routes.map((route) => <Route key={route.path} {...route} />)}
          <Route path='*' element={<Navigate to='/' />} />
        </Routes>
        <NavBar />
      </Router>
    </AppRoot>
  );
};