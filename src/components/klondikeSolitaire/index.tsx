'use client';

import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Flex } from "rebass";
import styled from "styled-components";

import { useStore } from "@/store/klonditeSolitaire.store";
import { Card } from "./components/Card";
import { Deck } from "./components/Deck";
import { Foundation } from "./components/Foundation";
import { Pile } from "./components/Pile";

const App = observer(() => {
  const {
    deck,
    foundations,
    handleDropToFoundation,
    handleDropToPile,
    handlePileCardClick,
    hasWon,
    initialize,
    piles,
    reset,
  } = useStore();

  useEffect(initialize, [initialize]);

  return (
    <div>
      <Flex alignItems="center">
        <h1>Solitaire</h1>

        <button type="button" onClick={reset} style={{ marginLeft: 12 }}>
          Reset
        </button>
      </Flex>

      {hasWon && <h1>Victory!</h1>}

      <Flex justifyContent="space-between">
        <Deck deck={deck} />

        <Flex>
          {foundations.map((foundation, index) => (
            <Foundation
              key={index}
              index={index}
              foundation={foundation}
              onCardDrop={handleDropToFoundation}
            />
          ))}
        </Flex>
      </Flex>

      <Flex>
        {piles.map((pile, index) => (
          <Pile
            key={index}
            index={index}
            pile={pile}
            onCardClick={handlePileCardClick}
            onCardDrop={handleDropToPile}
          />
        ))}
      </Flex>
      <HiddenCards>
        {deck.pile.cards.map((card) => (
          <Card key={card.key} card={card} isTurned />
        ))}
      </HiddenCards>
    </div>
  );
});

const HiddenCards = styled.div`
  width: 1px;
  height: 1px;
  opacity: 0.0001;
`;

export default App;
