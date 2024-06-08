import { useState, useEffect } from 'react';

export const useAnimatedNumber = (value: number, duration: number): number => {
  const [displayValue, setDisplayValue] = useState(value > 150 ? value - 140 : value);
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(0);
  const [startTime, setStartTime] = useState(0);

  useEffect(() => {
    setStart(displayValue);
    setEnd(value);
    setStartTime(Date.now());
  }, [value]);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      const elapsed = now - startTime;
      if (elapsed >= duration) {
        clearInterval(interval);
        setDisplayValue(end);
      } else {
        const progress = elapsed / duration;
        setDisplayValue(Math.floor(start + (end - start) * progress));
      }
    }, 40);

    return () => clearInterval(interval);
  }, [start, end, startTime, duration]);

  return displayValue;
};
