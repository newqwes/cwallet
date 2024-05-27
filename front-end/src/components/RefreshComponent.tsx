import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDataRequest } from '../store/userReducer.ts';
import { selectLoading, selectUserCoinCount, selectError } from '../selectors/selectors';

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
      {coins && <h1>{coins} coins</h1>}
      <button onClick={() => dispatch(fetchDataRequest())}>Refresh</button>
      {error && <pre>Error: {JSON.stringify(error)}</pre>}
      {loading && <p>Loading...</p>}
    </div>
  );
};

export default RefreshComponent;
