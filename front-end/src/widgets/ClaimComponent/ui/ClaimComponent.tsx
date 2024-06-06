import { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { differenceInMilliseconds } from 'date-fns';
import {
  claimCoins,
  fetchUser,
  selectError,
  selectLoading,
  selectUserCoinCount,
  selectUserNextClaimDate,
  selectUserRefCode,
} from '../../../entities/User';
import { useMagicNumber } from '../../../shared/libs/useMagicNumber';
import { ClaimButton, Coins, Wrapper, RefCode } from './styled';

export const ClaimComponent: FC = () => {
  const dispatch = useDispatch();
  const coins = useSelector(selectUserCoinCount);
  const refCode = useSelector(selectUserRefCode);
  const nextClaimDate = useSelector(selectUserNextClaimDate);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  const currendDateMs = new Date();
  const nextClaimDateMs = new Date(nextClaimDate);
  const initialTimeLeft = differenceInMilliseconds(nextClaimDateMs, currendDateMs);

  const [magicNumber, setMagicNumber] = useMagicNumber(1, 100);
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

  useEffect(() => {
    if (isTimerActive) {
      return;
    }

    const magicNumberId = setInterval(() => {
      setMagicNumber();
    }, 100);

    return () => clearInterval(magicNumberId);
  }, [magicNumber, isTimerActive]);

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
    <Wrapper>
      <RefCode>My referral code: {refCode}</RefCode>
      {coins && <Coins>{coins}</Coins>}
      <ClaimButton disabled={isTimerActive} onClick={handleClickClaimBtn}>
        {isTimerActive ? formatTime(timeLeft) : magicNumber}
      </ClaimButton>
      {error && <pre>Error: {JSON.stringify(error)}</pre>}
      {loading && <p>Loading...</p>}
    </Wrapper>
  );
};
