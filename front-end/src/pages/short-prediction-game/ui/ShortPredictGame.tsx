import { FC, useState } from "react";
import {
  Container,
  Question,
  CardWrapper,
  AnswerCard,
  CardFront,
  CardBack,
  SelectButton,
  Card
} from './styled';

export const ShortPredictGame: FC = () => {
  const [flippedCardIndex, setFlippedCardIndex] = useState<number | null>(null);

  const answers = [
    "Bitcoin",
    "Ethereum",
    "Ripple",
    "Litecoin",
    "Polkadot",
    "Cardano"
  ];

  const handleCardClick = (index: number) => {
    setFlippedCardIndex(index === flippedCardIndex ? null : index);
  };

  return (
    <Container>
      <Question>Which coin will show the best result in 24 hours?</Question>
      <CardWrapper>
        {answers.map((answer, index) => (
          <AnswerCard
            key={index}
            isFlipped={index === flippedCardIndex}
            onClick={() => handleCardClick(index)}
          >
            {
              index !== flippedCardIndex &&
              <CardFront>
                {answer}
              </CardFront>
            }
            {
              index === flippedCardIndex &&
              <CardBack>
                <Card>
                  <h2>{`You selected ${answer}`}</h2>
                  <SelectButton>Select</SelectButton>
                </Card>
              </CardBack>
            }
          </AnswerCard>
        ))}
      </CardWrapper>
    </Container>
  )
    ;
};
