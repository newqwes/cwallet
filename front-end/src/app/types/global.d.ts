export { };

declare global {
  interface Window {
    Telegram: {
      WebApp: any,
    };
  };

  // eslint-disable-next-line @typescript-eslint/consistent-type-imports
  declare type RootState = import('../store').RootState;
  // eslint-disable-next-line @typescript-eslint/consistent-type-imports
  declare type AppDispatch = import('../store').AppDispatch;

};
