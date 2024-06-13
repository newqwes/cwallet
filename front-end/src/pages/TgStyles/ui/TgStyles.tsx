import { FC, useState, useEffect } from 'react';
import { GameBoard, Card, VictoryMessage, CardInner, CardFront, CardBack, Wrapper } from './styled';
import { Button } from "../../../shared/ui";

const CARD_ELEMENTS = ["💵", "💶", "💷", "💴", "🧧", "🪙"];
const CARDS_AMOUNT = 12;

interface CardType {
  id: number;
  value: string;
  isFlipped: boolean;
}

export const TgStyles: FC = () => {
  const [cards, setCards] = useState<CardType[]>([]);
  const [visibleCards, setVisibleCards] = useState<CardType[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<string[]>([]);

  useEffect(() => {
    startGame();
  }, []);

  const startGame = () => {
    setVisibleCards([]);
    setMatchedPairs([]);
    const cardValues = generateArrayWithPairs(CARD_ELEMENTS, CARDS_AMOUNT);
    setCards(cardValues.map((value, index) => ({id: index, ...value, isFlipped: false})));
  };

  const handleCardClick = (card: CardType) => {
    if (card.isFlipped || matchedPairs.includes(card.value)) {
      return;
    }

    const newVisibleCards = [...visibleCards, card];
    const newCards = cards.map(c => c.id === card.id ? {...c, isFlipped: true} : c);

    setVisibleCards(newVisibleCards);
    setCards(newCards);

    if (newVisibleCards.length === 2) {
      if (newVisibleCards[0].value === newVisibleCards[1].value) {
        setMatchedPairs([...matchedPairs, newVisibleCards[0].value]);
        setVisibleCards([]);
      } else {
        setTimeout(() => {
          setCards(cards.map(c => newVisibleCards.find(v => v.id === c.id) ? {...c, isFlipped: false} : c));
          setVisibleCards([]);
        }, 500);
      }
    }
  };

  const generateArrayWithPairs = (arr: string[], fieldSize: number): { value: string }[] => {
    let array: { value: string }[] = [];
    let elementCounts: { [key: string]: number } = arr.reduce((acc, element) => ({...acc, [element]: 0}), {});

    while (array.length < fieldSize) {
      let randomIndex = Math.floor(Math.random() * arr.length);
      let randomElement = arr[randomIndex];

      if (elementCounts[randomElement] < 2) {
        array.push({value: randomElement});
        elementCounts[randomElement]++;
      }
    }

    return array;
  };

  const isVictory = matchedPairs.length * 2 === CARDS_AMOUNT;

  return (
    <Wrapper>
      <GameBoard>
        {cards.map((card) => (
          <Card key={card.id} onClick={() => handleCardClick(card)}>
            <CardInner isFlipped={card.isFlipped}>
              <CardFront>?</CardFront>
              <CardBack>{card.value}</CardBack>
            </CardInner>
          </Card>
        ))}
      </GameBoard>
      {isVictory && <VictoryMessage>Поздравляю, вы победили!</VictoryMessage>}
      <Button size='sm' btnStyle={'secondary'} onClick={startGame}>Новая игра</Button>
    </Wrapper>
  );
};
