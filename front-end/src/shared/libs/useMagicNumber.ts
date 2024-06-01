import { useState, useEffect } from 'react';

type UseMagicNumberType = [number, () => void];

function generateMagicNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function useMagicNumber(min: number = 0, max: number = 100): UseMagicNumberType {
  const [number, setNumber] = useState(generateMagicNumber(min, max));

  function updateNumber() {
    setNumber(generateMagicNumber(min, max));
  };

  useEffect(() => {
    updateNumber();
  }, []);

  return [number, updateNumber];
};
