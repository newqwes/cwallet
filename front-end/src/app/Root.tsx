import { FC } from 'react';
import { ErrorBoundary } from './ErrorBoundary';
import { App } from './App';
import { SDKProvider } from '@tma.js/sdk-react';
import { Provider } from 'react-redux';
import store from '../store/store';

const ErrorBoundaryError: FC<{ error: unknown }> = ({ error }) => (
  <div>
    <p>An unhandled error occurred:</p>
    <blockquote>
      <code>
        {error instanceof Error
          ? error.message
          : typeof error === 'string'
            ? error
            : JSON.stringify(error)}
      </code>
    </blockquote>
  </div>
);

export const Root: FC = () => {
  return (
    <ErrorBoundary fallback={ErrorBoundaryError}>
      <SDKProvider>
        <Provider store={store}>
          <App />
        </Provider>
      </SDKProvider>
    </ErrorBoundary>
  );
};
