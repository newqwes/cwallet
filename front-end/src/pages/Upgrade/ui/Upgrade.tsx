import { FC, useEffect, useRef, useState } from 'react';
import {
  CardWrapper, UpgradeContainer,
  CardTop, CardBottom,
  TitleWrapper, ImgWrapper,
  Cards, TopText, TopTitle,
  TopDesc, TopProfit,
  BottomLevel, BottomPrice,
  LevelModal,
} from './styled';
import { useAnimatedNumber, Coins, Button } from '../../../shared/ui';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUpgrades, selectUpgradesDate, selectUserCoinCount, upgradeLevel } from '../../../entities/User';
import { vibrateNow } from '../../../shared/libs/vibration.ts';
import Earn from '../../../shared/assets/gold_coins.png';
import Time from '../../../shared/assets/hourglass.png';
import Luck from '../../../shared/assets/four-petal_clover.png';
import Secret from '../../../shared/assets/secret_level.png';
import { getReadableCount } from '../../../shared/libs/toNormalNumber.ts';
import { ILevelData } from '../../../shared/types';
import { CloseCircleOutlined } from '@ant-design/icons';

const levelsData = {
  Earn: {
    img: Earn,
    desc: 'Earn per click',
    profit: (upgrades: string[]) => {
      return `${getReadableCount(upgrades[2])} - ${getReadableCount(upgrades[3])}✨`;
    },
  },
  Time: {
    img: Time,
    desc: 'Waiting time',
    profit: (upgrades: string[]) => {
      return `${upgrades[2]} - ${upgrades[3]}`;
    },
  },
  Luck: {
    img: Luck,
    desc: 'Chance of luck',
    profit: (upgrades: string[]) => {
      return upgrades[1];
    },
  },
  Secret: {
    img: Secret,
    desc: 'Secret level',
    profit: (upgrades: string[]) => {
      return upgrades[1];
    },
  },
};


export const Upgrade: FC = () => {
  const coins = useSelector(selectUserCoinCount);
  const [levelModal, setLevelModal] = useState({} as ILevelData);
  const levels = useSelector(selectUpgradesDate);
  const dispatch = useDispatch();
  const modalRef = useRef<HTMLDivElement>(null); // Ref for the modal content

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (levelModal.name && modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setLevelModal({} as ILevelData);
      }
    };

    // Add when the modal is open
    if (levelModal.name) {
      document.addEventListener('mousedown', handleOutsideClick);
    }

    return () => {
      // Clean up the event listener
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [levelModal.name]);

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
      <Cards>
        {levels?.map((level) => (
          <CardWrapper key={level.id} onClick={() => setLevelModal(level)}>
            <CardTop>
              <ImgWrapper>
                <img src={levelsData[level.name].img} alt={level.name}/>
              </ImgWrapper>
              <TopText>
                <TopTitle>{level.name}</TopTitle>
                <TopDesc>{levelsData[level.name].desc}</TopDesc>
                <TopProfit>{levelsData[level.name].profit(level.upgrade)}</TopProfit>
              </TopText>
            </CardTop>
            <CardBottom>
              <BottomLevel>lvl {level.level + 1}</BottomLevel>
              <BottomPrice>✨{getReadableCount(level.price)}</BottomPrice>
            </CardBottom>
          </CardWrapper>
        ))}
      </Cards>

      <LevelModal hide={!levelModal.name}>
        <div ref={modalRef}>
          <CloseCircleOutlined onClick={() => setLevelModal({} as ILevelData)}/>
          <ImgWrapper>
            <img src={levelsData[levelModal?.name]?.img} alt={levelModal.name}/>
          </ImgWrapper>
          <h1>{levelModal.name}</h1>
          <TopDesc>{levelsData[levelModal?.name]?.desc}</TopDesc>
          <h2>lvl {levelModal.level + 1}</h2>
          <TopProfit>{levelsData[levelModal?.name]?.profit(levelModal?.upgrade)}</TopProfit>
          <h3>✨{getReadableCount(levelModal.price)}</h3>
          <Button isDisabled={levelModal.price > coins}
                  onClick={() => handleClickClaimBtn(levelModal.id, levelModal.price)}>Upgrade</Button>
        </div>
      </LevelModal>
    </UpgradeContainer>
  );
};
