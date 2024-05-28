import { FC } from 'react';
import {
  useLaunchParams,
  useMiniApp,
} from '@tma.js/sdk-react';
import { AppRoot } from '@telegram-apps/telegram-ui';
import RefreshComponent from '../shared/ui/RefreshComponent/RefreshComponent';

export const App: FC = () => {
  const lp = useLaunchParams();
  const miniApp = useMiniApp();

  return (
    <AppRoot
      appearance={miniApp.isDark ? 'dark' : 'light'}
      platform={['macos', 'ios'].includes(lp.platform) ? 'ios' : 'base'}
    >
      <RefreshComponent />
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis repellendus quaerat eaque repellat.
    </AppRoot>
  );
};