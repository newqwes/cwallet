import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { differenceInMilliseconds } from 'date-fns';
import { postEvent } from '@tma.js/sdk';
import {
  claimCoins,
  selectUserCoinCount, selectUserGeneralLevel,
  selectUserNextClaimDate
} from '../../../entities/User';
import {
  Coins,
  Wrapper,
  CoinWrapper,
  MainImg,
  InvisibleButton,
  CoinChangeText,
  VersionBox,
  MainWrapper,
  UpgradeButtonWrapper
} from './styled';
import { useAnimatedNumber } from './useAnimatedNumber';
import { selectUserClaimedCoins } from '../../../entities/User/model/selectors.ts';
import { Button } from '../../../shared/ui';
import { vibrateNow } from '../../../shared/libs/vibration.ts';
import { useNavigate } from 'react-router-dom';
import { TimerComponent } from '../../../shared/libs/Timer/Timer.tsx';

export const ClaimComponent: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const coins = useSelector(selectUserCoinCount);
  const generalLevel = useSelector(selectUserGeneralLevel);
  const claimedCoins = useSelector(selectUserClaimedCoins);
  const nextClaimDate = useSelector(selectUserNextClaimDate);

  const currentDateMs = new Date();
  const nextClaimDateMs = new Date(nextClaimDate);
  const isTimerActive = differenceInMilliseconds(nextClaimDateMs, currentDateMs) >= 0;

  const handleClickClaimBtn = () => {
    dispatch(claimCoins());
  };

  const handleClickNotYet = () => {
    if (isTimerActive) {
      // @ts-expect-error: This error is expected because web_app_trigger_haptic_feedback obj params is empty
      postEvent('web_app_trigger_haptic_feedback', {
        type: 'notification',
        impact_style: 'heavy',
        notification_type: 'error'
      });
    }
  };

  const animatedCoins = useAnimatedNumber(coins, 1000);
  const handleUpgradeClick = () => {
    vibrateNow('success', 'impact', 'light');
    navigate('/upgrade');
  };

  return (
    <Wrapper>
      <CoinWrapper>
        <h1>Level: {generalLevel}</h1>
        <span>The value of the lowest of your levels</span>
        <Coins>{animatedCoins}✨</Coins>
      </CoinWrapper>
      {claimedCoins !== null && <CoinChangeText isActive={!isTimerActive}>+{claimedCoins}</CoinChangeText>}
      <VersionBox>
        <h6>App Version: 0.1.24</h6>
      </VersionBox>
      <MainWrapper onClick={handleClickNotYet}>
        <MainImg isActive={!isTimerActive}/>
        <InvisibleButton onClick={handleClickClaimBtn} isActive={!isTimerActive}/>
        <TimerComponent nextDate={nextClaimDate}/>
      </MainWrapper>
      <UpgradeButtonWrapper>
        <Button btnStyle={'primary'} onClick={handleUpgradeClick}>
          Upgrade
        </Button>
      </UpgradeButtonWrapper>
    </Wrapper>
  );
};
