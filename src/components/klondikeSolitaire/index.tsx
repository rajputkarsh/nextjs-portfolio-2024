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

const KlonditeSolitaire = observer(() => {
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

  useEffect(() => {
    if(hasWon) {

    }
  }, [hasWon]);

  return (
    <div className="px-8">
      <div className="flex flex-row justify-center gap-8 mb-4">
        <h1 className="text-4xl font-bold">Solitaire</h1>

        <button className="bg-[#181364] text-white px-4 rounded" type="button" onClick={reset}>
          New Game
        </button>
      </div>

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

export default KlonditeSolitaire;
