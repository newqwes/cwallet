import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
  CoinPrice,
} from './styled';
import {
  fetchShortGameData,
  selectShortGameCoin,
  selectShortGameData,
  selectAlreadyInGame,
  selectIsActiveGame, selectGamePeriod
} from "../../../entities/ShortGame";
import { InGameComponent } from "./InGameComponent/InGame.tsx";

export const ShortPredictGame: FC = () => {
  const [flippedCardIndex, setFlippedCardIndex] = useState<number | null>(null);

  const shortGameData = useSelector(selectShortGameData);
  const alreadyInGame = useSelector(selectAlreadyInGame);
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

  return isActive ?
    <Container onClick={() => handleOutsideClick()}>
      <Question>Which coin will show the best result in 24 hours?</Question>
      <CardWrapper>
        {shortGameData.map((coin, index) => (
          <AnswerCard
            key={index}
            isFlipped={index === flippedCardIndex}
          >
            {
              index !== flippedCardIndex &&
              <CardFront onClick={(e) => handleCardClick(index, e)}>
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
    />
    ;
};
