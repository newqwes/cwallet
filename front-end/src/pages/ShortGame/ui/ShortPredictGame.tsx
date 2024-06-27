import { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container,
  Question,
  CardWrapper,
  AnswerCard,
  CardFront,
  CardBack,
  SelectButton,
  Card,
  CoinImage,
  CoinInfo,
  CoinName,
  CoinPrice, TitleWrapper,
} from './styled';
import {
  fetchShortGameData,
  selectShortGameCoin,
  selectShortGameData,
  selectAlreadyInGame,
  selectIsActiveGame, selectGamePeriod,
} from '../../../entities/ShortGame';
import { InGameComponent } from './InGameComponent/InGame.tsx';
import { TimerComponent } from '../../../shared/libs/Timer/Timer.tsx';
import { selectUserGeneralLevel } from '../../../entities/User';
import { RewardsTable } from './RewardsTable/RewardsTable.tsx';

export const ShortPredictGame: FC = () => {
  const [flippedCardIndex, setFlippedCardIndex] = useState<number | null>(null);

  const shortGameData = useSelector(selectShortGameData);
  const alreadyInGame = useSelector(selectAlreadyInGame);
  const userGeneralLevel = useSelector(selectUserGeneralLevel);

  const isActive = useSelector(selectIsActiveGame);
  const gamePeriod = useSelector(selectGamePeriod);


  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchShortGameData());
  }, []);

  const handleCardClick = (index: number, e: any) => {
    e.stopPropagation();
    setFlippedCardIndex(index);
  };

  const handleOutsideClick = () => {
    setFlippedCardIndex(null);
  };

  const handleSelectClick = (coinId: string) => {
    setFlippedCardIndex(null);

    dispatch(selectShortGameCoin(coinId));
  };
  const isTimeOver = () => {
    dispatch(fetchShortGameData());
  };
  return isActive ?
    <Container onClick={() => handleOutsideClick()}>
      <TitleWrapper>
        <TimerComponent nextDate={gamePeriod.progress} isTimeOver={isTimeOver}/>
        <Question>Which coin will show the best result in next 4 hours?</Question>
      </TitleWrapper>
      <RewardsTable level={userGeneralLevel}/>
      <CardWrapper>
        {shortGameData.map((coin, index) => (
          <AnswerCard
            key={index}
            isSelected={!!alreadyInGame.coin_list_id && (alreadyInGame.coin_list_id === coin.coin_list_id)}
            isFlipped={index === flippedCardIndex}
          >
            {
              index !== flippedCardIndex &&
              <CardFront
                onClick={(e) => handleCardClick(index, e)}>
                <CoinImage src={coin.coin_info.image_link} alt={coin.coin_info.name}/>
                <CoinInfo>
                  <CoinName>{coin.coin_info.name}</CoinName>
                  <CoinPrice>${coin.coin_info.current_price}</CoinPrice>
                </CoinInfo>
              </CardFront>
            }
            {
              index === flippedCardIndex &&
              <CardBack onClick={(e) => e.stopPropagation()}>
                <Card>
                  <h2>{`You selected ${coin.coin_info.name}`}?</h2>
                  <CoinImage src={coin.coin_info.image_link} alt={coin.coin_info.name}/>
                  <CoinPrice>${coin.coin_info.current_price}</CoinPrice>
                  <SelectButton onClick={() => handleSelectClick(coin.coin_info.coin_id)}>Select</SelectButton>
                </Card>
              </CardBack>
            }
          </AnswerCard>
        ))}
      </CardWrapper>
    </Container> :
    <InGameComponent
      gamePeriod={gamePeriod.end}
      selectedCoinId={alreadyInGame.coin_list_id}
      coins={shortGameData}
      userGeneralLevel={userGeneralLevel}
    />;
};
