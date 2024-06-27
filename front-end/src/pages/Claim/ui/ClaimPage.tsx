import { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { differenceInMilliseconds } from 'date-fns';
import { postEvent } from '@tma.js/sdk';
import {
  claimCoins,
  selectUserNextClaimDate,
} from '../../../entities/User';
import {
  Wrapper,
  MainImg,
  InvisibleButton,
  CoinChangeText,
  VersionBox,
  MainWrapper,
  UpgradeButtonWrapper,
} from './styled';
import { selectUserClaimedCoins } from '../../../entities/User/model/selectors.ts';
import { Button, HeaderCoins } from '../../../shared/ui';
import { vibrateNow } from '../../../shared/libs/vibration.ts';
import { useNavigate } from 'react-router-dom';
import { TimerComponent } from '../../../shared/libs/Timer/Timer.tsx';

export const ClaimPage: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const claimedCoins = useSelector(selectUserClaimedCoins);
  const nextClaimDate = useSelector(selectUserNextClaimDate);
  const currentDateMs = new Date();
  const nextClaimDateMs = new Date(nextClaimDate);

  const [isTimerActive, setTimerActive] = useState(true);

  useEffect(() => {
    setTimerActive(differenceInMilliseconds(nextClaimDateMs, currentDateMs) >= 0);
  }, [nextClaimDate]);

  const handleClickClaimBtn = () => {
    dispatch(claimCoins());
  };

  const handleClickNotYet = () => {
    if (isTimerActive) {
      // @ts-expect-error: This error is expected because web_app_trigger_haptic_feedback obj params is empty
      postEvent('web_app_trigger_haptic_feedback', {
        type: 'notification',
        impact_style: 'heavy',
        notification_type: 'error',
      });
    }
  };

  const handleUpgradeClick = () => {
    vibrateNow('success', 'impact', 'light');
    navigate('/upgrade');
  };

  const isTimeOver = () => {
    setTimerActive(false);
  };

  return (
    <Wrapper>
      <HeaderCoins/>
      {claimedCoins !== null && <CoinChangeText isActive={!isTimerActive}>+{claimedCoins}</CoinChangeText>}
      <VersionBox>
        <h6>App Version: 0.1.28</h6>
      </VersionBox>
      <MainWrapper onClick={handleClickNotYet}>
        <MainImg isActive={!isTimerActive}/>
        <InvisibleButton onClick={handleClickClaimBtn} isActive={!isTimerActive}/>
        <TimerComponent nextDate={nextClaimDate} isTimeOver={isTimeOver}/>
      </MainWrapper>
      <UpgradeButtonWrapper>
        <Button btnStyle={'primary'} onClick={handleUpgradeClick}>
          Upgrade
        </Button>
      </UpgradeButtonWrapper>
    </Wrapper>
  );
};
