import {
  Wrapper,
  CoinCard,
  CoinCardImg,
  CoinCardNameWrapper,
  CoinCardName,
  CoinCardShortName,
  CoinCardPriceWrapper,
  CoinCardPercent,
  CoinCardPrice,
  CoinCardChart
} from './styled.ts';
import { TimerComponent } from "../../../../shared/libs/Timer/Timer.tsx";
import { LineGraph } from "../../../../shared/libs/LineGraph/LineGraph.tsx";
import { IGameCoin } from "../../../../shared/types";

interface Props {
  gamePeriod: Date | string;
  selectedCoinId: string | null | undefined;
  coins: IGameCoin[];
}

export const InGameComponent = ({ gamePeriod, selectedCoinId, coins }: Props) => {
  return (
    <Wrapper>
      <TimerComponent nextDate={gamePeriod}/>
      {
        coins.map((coin) => (
          <CoinCard isSelected={coin.coin_list_id === selectedCoinId}>
            <CoinCardImg src={coin.coin_info.image_link} alt={coin.coin_info.name}/>
            <CoinCardNameWrapper>
              <CoinCardName>{coin.coin_info.name}</CoinCardName>
              <CoinCardShortName>{coin.coin_info.symbol}</CoinCardShortName>
            </CoinCardNameWrapper>
            <CoinCardPriceWrapper>
              <CoinCardPercent
                positive={coin.volatility > 0}>{coin.volatility > 0 ? '+' : ''}{coin.volatility}%</CoinCardPercent>
              <CoinCardPrice>{coin.coin_info.current_price}$</CoinCardPrice>
            </CoinCardPriceWrapper>
            <CoinCardChart>
              <LineGraph data={coin.coin_info.historical_chart_prices}/>
            </CoinCardChart>
          </CoinCard>
        ))
      }
    </Wrapper>
  );
};
