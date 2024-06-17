import { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { differenceInMilliseconds } from 'date-fns';
import { postEvent } from '@tma.js/sdk';
import {
  claimCoins,
  selectUserCoinCount,
  selectUserNextClaimDate,
} from '../../../entities/User';
import {
  Timer,
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
import { selectUserClaimedCoins } from "../../../entities/User/model/selectors.ts";
import { Button } from "../../../shared/ui";
import { vibrateNow } from "../../../shared/libs/vibration.ts";
import { useNavigate } from "react-router-dom";

export const ClaimComponent: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const coins = useSelector(selectUserCoinCount);
  const claimedCoins = useSelector(selectUserClaimedCoins);
  const nextClaimDate = useSelector(selectUserNextClaimDate);

  const currentDateMs = new Date();
  const nextClaimDateMs = new Date(nextClaimDate);
  const initialTimeLeft = differenceInMilliseconds(nextClaimDateMs, currentDateMs);

  const [timeLeft, setTimeLeft] = useState(initialTimeLeft);
  const isTimerActive = timeLeft >= 0;


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

  const handleClickNotYet = () => {
    if (isTimerActive) {
      // @ts-expect-error: This error is expected because web_app_trigger_haptic_feedback obj params is empty
      postEvent('web_app_trigger_haptic_feedback', {
        type: 'notification',
        impact_style: 'heavy',
        notification_type: 'error'
      });
    }
  }

  const formatTime = (time: number) => {
    const hours = Math.floor(time / (1000 * 60 * 60));
    const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((time % (1000 * 60)) / 1000);

    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const animatedCoins = useAnimatedNumber(coins, 1000);
  const handleUpgradeClick = () => {
    vibrateNow('success', 'impact', 'light');
    navigate('/upgrade');
  }

  return (
    <Wrapper>
      <CoinWrapper>
        <h1>Level 1</h1>
        <Coins>{animatedCoins}✨</Coins>
      </CoinWrapper>
      {claimedCoins !== null && <CoinChangeText isActive={!isTimerActive}>+{claimedCoins}</CoinChangeText>}
      <VersionBox>
        <h6>App Version: 0.1.17</h6>
      </VersionBox>
      <MainWrapper onClick={handleClickNotYet}>
        <MainImg isActive={!isTimerActive}/>
        <InvisibleButton onClick={handleClickClaimBtn} isActive={!isTimerActive}/>
        <Timer>{isTimerActive && formatTime(timeLeft)}</Timer>
      </MainWrapper>
      <UpgradeButtonWrapper>
        <Button btnStyle={'primary'} onClick={handleUpgradeClick}>
          Upgrade
        </Button>
      </UpgradeButtonWrapper>
    </Wrapper>
  );
};
