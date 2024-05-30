import { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Title } from '@telegram-apps/telegram-ui';
import { differenceInMilliseconds } from 'date-fns';
import {
  claimCoins,
  fetchUser,
  selectError,
  selectLoading,
  selectUserCoinCount,
  selectUserNextClaimDate,
} from '../../../entities/User';

export const ClaimComponent: FC = () => {
  const dispatch = useDispatch();
  const coins = useSelector(selectUserCoinCount);
  const nextClaimDate = useSelector(selectUserNextClaimDate);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  const currendDateMs = new Date();
  const nextClaimDateMs = new Date(nextClaimDate);
  const initialTimeLeft = differenceInMilliseconds(nextClaimDateMs, currendDateMs);

  const [timeLeft, setTimeLeft] = useState(initialTimeLeft);
  const isTimerActive = timeLeft >= 0;

  useEffect(() => {
    dispatch(fetchUser());
  }, []);

  useEffect(() => {
    setTimeLeft(initialTimeLeft);
  }, [nextClaimDate]);

  useEffect(() => {
    if (timeLeft <= 0) {
      return;
    }

    const timerId = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1000);
    }, 1000);

    return () => clearInterval(timerId);
  }, [timeLeft]);

  const handleClickClaimBtn = () => {
    dispatch(claimCoins());
  }

  const formatTime = (time: number) => {
    const hours = Math.floor(time / (1000 * 60 * 60));
    const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((time % (1000 * 60)) / 1000);

    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div>
      {coins && <Title level='1' weight='1' >{coins} 🪙</Title>}
      <Button style={{ width: '100px' }} disabled={isTimerActive} onClick={handleClickClaimBtn}>
        {isTimerActive ? formatTime(timeLeft) : 'Claim'}
      </Button>
      {error && <pre>Error: {JSON.stringify(error)}</pre>}
      {loading && <p>Loading...</p>}
    </div>
  );
};
