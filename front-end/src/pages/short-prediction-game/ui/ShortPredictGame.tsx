import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import Chart, { Props as ApexChartProps } from 'react-apexcharts';
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
  InGame,
  // StyledChartContainer
} from './styled';
import {
  fetchShortGameData,
  selectShortGameCoin,
  selectShortGameData,
  selectAlreadyInGame
} from "../../../entities/ShortGame";
import { isNumber } from "lodash";
// import { toNormalNumber } from "../../../shared/libs/toNormalNumber.ts";

export const ShortPredictGame: FC = () => {
  const [flippedCardIndex, setFlippedCardIndex] = useState<number | null>(null);

  const shortGameData = useSelector(selectShortGameData);
  const alreadyInGame = useSelector(selectAlreadyInGame);
  const dispatch = useDispatch();

  console.log('--QWES-- alreadyInGame: ', alreadyInGame);
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


  //
  // const options = {
  //   chart: {
  //     type: 'line',
  //     height: 150,
  //     zoom: {
  //       enabled: false
  //     }
  //   },
  //   xaxis: {
  //     type: 'datetime'
  //   },
  //   yaxis: {
  //     labels: {
  //       formatter: (value: number) => toNormalNumber(value)
  //     }
  //   },
  //   tooltip: {
  //     x: {
  //       format: 'dd MMM yyyy',
  //       formatter: (value: number) => toNormalNumber(value)
  //     }
  //   }
  // } as ApexChartProps;

  return isNumber(alreadyInGame.place) ?
    <InGame>You are in the game! Your place is {alreadyInGame.place + 1}</InGame> :
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
                  {/*<StyledChartContainer>*/}
                  {/*  <Chart options={options} series={[{*/}
                  {/*    name: 'Values',*/}
                  {/*    data: coin.coin_info.historical_chart_prices*/}
                  {/*  }]} type="line" height={100}/>*/}
                  {/*</StyledChartContainer>*/}
                  <CoinImage src={coin.coin_info.image_link} alt={coin.coin_info.name}/>
                  <CoinPrice>${coin.coin_info.current_price}</CoinPrice>
                  <SelectButton onClick={() => handleSelectClick(coin.coin_info.coin_id)}>Select</SelectButton>
                </Card>
              </CardBack>
            }
          </AnswerCard>
        ))}
      </CardWrapper>
    </Container>;
};
