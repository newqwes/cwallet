import { round } from 'lodash';
import {
  Wrapper,
  Container,
  CoinCard,
  CoinCardImg,
  CoinCardNameWrapper,
  CoinCardName,
  CoinCardShortName,
  CoinCardPriceWrapper,
  CoinCardPercent,
  CoinCardPrice,
  CoinCardChart,
} from './styled.ts';
import { TimerComponent } from '../../../../shared/libs/Timer/Timer.tsx';
import { LineGraph } from '../../../../shared/libs/LineGraph/LineGraph.tsx';
import { IGameCoin } from '../../../../shared/types';
import { getPlaceIcon } from '../../../../shared/libs';
import { RewardsTable } from '../RewardsTable/RewardsTable.tsx';

interface Props {
  gamePeriod: Date | string;
  selectedCoinId: string | null | undefined;
  coins: IGameCoin[];
  userGeneralLevel: number;
}

export const InGameComponent = ({ gamePeriod, selectedCoinId, coins, userGeneralLevel }: Props) => {
  const isTimeOver = () => {
    console.log('Time is Over');
  };
  return (
    <Container>
      <Wrapper className="scroll_on">
        {
          coins.map((coin, index) => (
            <CoinCard isSelected={coin.coin_list_id === selectedCoinId}>
              <CoinCardImg src={coin.coin_info.image_link} alt={coin.coin_info.name}/>
              <CoinCardNameWrapper>
                <CoinCardName>{coin.coin_info.name}</CoinCardName>
                <CoinCardShortName>{getPlaceIcon(index)} {coin.coin_info.symbol}</CoinCardShortName>
              </CoinCardNameWrapper>
              <CoinCardPriceWrapper>
                <CoinCardPercent
                  positive={coin.volatility >= 0}>{coin.volatility > 0 ? '+' : ''}{round(coin.volatility, 2)}%</CoinCardPercent>
                <CoinCardPrice>{coin.coin_info.current_price}$</CoinCardPrice>
              </CoinCardPriceWrapper>
              <CoinCardChart>
                <LineGraph data={coin.coin_info.historical_chart_prices}/>
              </CoinCardChart>
            </CoinCard>
          ))
        }
      </Wrapper>
      <TimerComponent nextDate={gamePeriod} isTimeOver={isTimeOver}/>
      <RewardsTable level={userGeneralLevel}/>
    </Container>
  );
};
