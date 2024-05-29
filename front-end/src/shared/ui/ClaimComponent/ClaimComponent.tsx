import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectError, selectLoading, selectUserCoinCount } from '../../../selectors/selectors';
import { claimRequest } from '../../../store/claimReducer';
import { Button, Title } from '@telegram-apps/telegram-ui';

const ClaimComponent: React.FC = () => {
  const dispatch = useDispatch();
  const coins = useSelector(selectUserCoinCount);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  return (
    <div>
      {coins && <Title level='1' weight='1' >{coins} 🪙</Title>}
      <Button onClick={() => dispatch(claimRequest())}>
        Claim
      </Button>
      {error && <pre>Error: {JSON.stringify(error)}</pre>}
      {loading && <p>Loading...</p>}
    </div>
  );
};

export default ClaimComponent;
