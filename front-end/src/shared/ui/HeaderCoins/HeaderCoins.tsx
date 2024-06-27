import { FC } from 'react';
import { useSelector } from 'react-redux';
import {
  selectUserCoinCount, selectUserGeneralLevel,
} from '../../../entities/User';
import {
  Coins,
  CoinWrapper,
} from './styled';
import { useAnimatedNumber } from './useAnimatedNumber';

export const HeaderCoins: FC = () => {
  const coins = useSelector(selectUserCoinCount);
  const generalLevel = useSelector(selectUserGeneralLevel);
  const animatedCoins = useAnimatedNumber(coins, 1000);

  return (
    <CoinWrapper>
      <h1>Level: {generalLevel}</h1>
      <span>The value of the lowest of your levels</span>
      <Coins>{animatedCoins}✨</Coins>
    </CoinWrapper>
  );
};
