import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectError, selectLoading, selectUserCoinCount } from '../../../selectors/selectors.ts';
import { fetchDataRequest } from '../../../store/userReducer.ts';
import { Button, Title } from '@telegram-apps/telegram-ui';

const RefreshComponent: React.FC = () => {
  const dispatch = useDispatch();
  const coins = useSelector(selectUserCoinCount);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchDataRequest());
  }, [dispatch]);

  return (
    <div>
      {coins && <Title level='1' weight='1'>{coins} 🪙</Title>}
      <Button onClick={() => dispatch(fetchDataRequest())}>
        Refresh
      </Button>
      {error && <pre>Error: {JSON.stringify(error)}</pre>}
      {loading && <p>Loading...</p>}
    </div>
  );
};

export default RefreshComponent;
