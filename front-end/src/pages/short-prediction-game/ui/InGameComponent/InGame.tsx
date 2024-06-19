import {
  Wrapper,
  Title,
  Place,
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
import { IShortGame } from "../../../../shared/types";
import { TimerComponent } from "../../../../shared/libs/Timer/Timer.tsx";
import { LineGraph } from "../../../../shared/libs/LineGraph/LineGraph.tsx";

interface Props {
  place: number;
  gamePeriod: string | null | undefined;
  selectedCoinId: string | null | undefined;
  coins: IShortGame[];
}

function parseDate(dateStr: string | null | undefined) {
  if (!dateStr) {
    return new Date();
  }
  const [day, month, year] = dateStr.split('.');
  return new Date(`${year}-${month}-${Number(day) + 2}T00:00:00Z`);
}

export const InGameComponent = ({ place, gamePeriod, selectedCoinId, coins }: Props) => {
  return (
    <Wrapper>
      <Title>
        <TimerComponent nextDate={parseDate(gamePeriod)}/>
        <Place>Place: #{place}</Place>
      </Title>
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
