// @ts-nocheck

import { FC } from "react";
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
import { Button } from "../../../shared/ui";
import { Coins } from "../../../widgets/ClaimComponent/ui/styled.ts";
import { useAnimatedNumber } from "../../../widgets/ClaimComponent/ui/useAnimatedNumber.tsx";
import { useSelector } from "react-redux";
import { selectUserCoinCount } from "../../../entities/User";
import { vibrateNow } from "../../../shared/libs/vibration.ts";

const smiles = {
  'Earn': '✨',
  'Time': '⏳',
  'Luck': '🍀',
  'Secret': '',
};

const levels = [
  {
    id: 1,
    level: 1,
    price: 8000,
    upgrade: ['40', '50', '120', '140'],
    name: 'Earn'
  },
  {
    id: 2,
    level: 1,
    price: 8000,
    upgrade: ['30s', '1m', '1m30s', '2m'],
    name: 'Time'
  },
  {
    id: 3,
    level: 1,
    price: 6000,
    upgrade: ['0%', '1.5%'],
    name: 'Luck'
  },
  {
    id: 4,
    level: 1,
    price: 14000,
    upgrade: ['🐱', '🐭'],
    name: 'Secret'
  }
];

export const Upgrade: FC = () => {
  const coins = useSelector(selectUserCoinCount);
  const animatedCoins = useAnimatedNumber(coins, 1000);

  return (
    <UpgradeContainer>
      <TitleWrapper>
        <div>Upgrade</div>
        <Coins>{animatedCoins}✨</Coins>
      </TitleWrapper>
      {levels.map((level) => (
          <CardWrapper key={level.id}>
            <RowWrapper>
              <CurrentCardTitle>{level.name} lvl. {level.level}</CurrentCardTitle>
              <CurrentCardRate>{level.upgrade[0]}{level.upgrade[2] ? (' - ' + level.upgrade[2]) : ''} {smiles[level.name]}</CurrentCardRate>
              <CardPrice>{level.price}✨</CardPrice>
            </RowWrapper>
            <RowWrapper>
              <NewCardTitle>{level.name} lvl. {level.level + 1}</NewCardTitle>
              <NewCardRate>{level.upgrade[1]}{level.upgrade[3] ? (' - ' + level.upgrade[3]) : ''} {smiles[level.name]}</NewCardRate>
              <CardButton>
                <Button btnStyle={'primary'} onClick={() => {
                  vibrateNow('error');
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
