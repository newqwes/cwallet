import { FC, useEffect } from 'react';
import {
  CardWrapper, UpgradeContainer, CurrentCardTitle,
  RowWrapper,
  NewCardTitle,
  CurrentCardRate,
  NewCardRate,
  CardPrice,
  CardButton,
  TitleWrapper
} from './styled';
import { Button } from '../../../shared/ui';
import { Coins } from '../../../widgets/ClaimComponent/ui/styled.ts';
import { useAnimatedNumber } from '../../../widgets/ClaimComponent/ui/useAnimatedNumber.tsx';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUpgrades, selectUpgradesDate, selectUserCoinCount, upgradeLevel } from '../../../entities/User';
import { vibrateNow } from '../../../shared/libs/vibration.ts';
import { getReadableCount } from '../../../shared/libs/toNormalNumber.ts';

const smiles = {
  'Earn': '✨',
  'Time': '⏳',
  'Luck': '🍀',
  'Secret': ''
};

export const Upgrade: FC = () => {
  const coins = useSelector(selectUserCoinCount);
  const levels = useSelector(selectUpgradesDate);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUpgrades());
  }, []);

  const handleClickClaimBtn = (levelName: string, price: number) => {
    if (price > coins) {
      vibrateNow('error');
      return;
    }
    dispatch(upgradeLevel(levelName));
    vibrateNow('success');
  };

  const animatedCoins = useAnimatedNumber(coins, 1000);

  return (
    <UpgradeContainer>
      <TitleWrapper>
        <div>Upgrade</div>
        <Coins>{animatedCoins}✨</Coins>
      </TitleWrapper>
      {levels?.map((level) => (
          <CardWrapper key={level.id}>
            <RowWrapper>
              <CurrentCardTitle>{level.name} lvl. {level.level}</CurrentCardTitle>
              <CurrentCardRate>{level.upgrade[0]}{level.upgrade[2] ? (' - ' + level.upgrade[2]) : ''} {smiles[level.name]}</CurrentCardRate>
              <CardPrice>{getReadableCount(level.price)}✨</CardPrice>
            </RowWrapper>
            <RowWrapper>
              <NewCardTitle>{level.name} lvl. {level.level + 1}</NewCardTitle>
              <NewCardRate>{level.upgrade[1]}{level.upgrade[3] ? (' - ' + level.upgrade[3]) : ''} {smiles[level.name]}</NewCardRate>
              <CardButton>
                <Button isDisabled={level.price > coins} type={'button'} btnStyle={'primary'} onClick={() => {
                  handleClickClaimBtn(level.id, level.price);
                }}>
                  Up
                </Button>
              </CardButton>
            </RowWrapper>
          </CardWrapper>
        )
      )}
    </UpgradeContainer>
  );
};
