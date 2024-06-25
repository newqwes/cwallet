import { useEffect, useState } from 'react';
import { differenceInMilliseconds } from 'date-fns';
import { Timer } from './styled';

const formatTime = (time: number) => {
  const hours = Math.floor(time / (1000 * 60 * 60));
  const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((time % (1000 * 60)) / 1000);

  return `${hours.toString().padStart(2, '0')}:${minutes
    .toString()
    .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};

interface Props {
  nextDate: Date | string;
  isTimeOver: () => void;
}

export const TimerComponent = ({ nextDate, isTimeOver }: Props) => {
  const currentDateMs = new Date();
  const nextClaimDateMs = new Date(nextDate);
  const initialTimeLeft = differenceInMilliseconds(nextClaimDateMs, currentDateMs);

  const [timeLeft, setTimeLeft] = useState(initialTimeLeft);
  const isTimerActive = timeLeft >= 0;


  useEffect(() => {
    setTimeLeft(initialTimeLeft);
  }, [nextDate]);

  useEffect(() => {
    if (timeLeft <= 0) {
      isTimeOver();
      return;
    }

    const timerId = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1000);
    }, 1000);

    return () => clearInterval(timerId);
  }, [timeLeft]);

  return (
    <Timer>{isTimerActive && formatTime(timeLeft)}</Timer>
  );
};
