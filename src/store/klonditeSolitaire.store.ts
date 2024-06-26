import { createContext, useContext, DragEvent } from "react";
import { makeAutoObservable, observable } from "mobx";
import { times } from "lodash";

import { CardModel } from ".//models/Card.model";
import { DeckModel } from ".//models/Deck.model";
import { FoundationModel } from ".//models/Foundation.model";
import { PileModel } from ".//models/Pile.model";

const PILES_COUNT = 7;
const FOUNDATIONS_COUNT = 4;

class KlonditeSolitaireStore {
  constructor() {
    makeAutoObservable(this);
  }

  deck = new DeckModel();

  foundations = observable<FoundationModel>(
    times(FOUNDATIONS_COUNT).map(() => new FoundationModel())
  );

  piles = observable<PileModel>(times(PILES_COUNT).map(() => new PileModel()));

  get hasWon() {
    return this.foundations.every((foundation) => foundation.isDone);
  }

  initialize = () => {
    this.deck.initialize();

    times(PILES_COUNT).forEach((_, pileIndex) => {
      times(pileIndex + 1).forEach((_, cardIndex) => {
        const card = this.deck.pile.pop();
        const isLast = cardIndex === pileIndex;

        if (card) {
          if (isLast) {
            card.reveal();
          }

          this.piles[pileIndex].add(card);
        }
      });
    });
  };

  reset = () => {
    this.deck.reset();
    this.foundations.forEach((foundation) => foundation.clear());
    this.piles.forEach((pile) => pile.clear());
    this.initialize();
  };

  // ====================================================
  // UI event handlers
  // ====================================================
  handlePileCardClick = (card: CardModel, pile: PileModel) => {
    const validFoundation = this.foundations.find((foundation) =>
      foundation.canAdd(card)
    );
    if (validFoundation) {
      validFoundation.add(card);
      pile.remove(card);
      pile.revealLastCard();
    }
  };

  handlePileCardDrag = (event: DragEvent) => {
    event.dataTransfer.setData("isFromDeck", "true");
  };

  handleDropFromDeck = (target: PileModel) => {
    const card = this.deck.pileTurned.lastCard;

    if (card && target && target.canAdd(card)) {
      target.add(card);
      this.deck.pileTurned.remove(card);
    }
  };

  handleDropToPile = (
    fromDeck: boolean,
    cardIndex: number,
    pileIndexFrom: number,
    pileIndexTo: number
  ) => {
    const pile = this.piles[pileIndexTo];

    if (fromDeck) {
      this.handleDropFromDeck(pile);
      return;
    }

    const sourcePile = this.piles[pileIndexFrom];
    const sourceCards = sourcePile.cards;
    const cards = sourceCards.slice(cardIndex, sourceCards.length);

    if (cards.length && pile && pile.canAdd(cards[0])) {
      cards.forEach((card) => {
        pile.add(card);
        sourcePile.remove(card);
      });

      sourcePile.revealLastCard();
    }
  };

  handleDropToFoundation = (
    fromDeck: boolean,
    cardIndex: number,
    pileIndex: number,
    foundationIndex: number
  ) => {
    const foundation = this.foundations[foundationIndex];

    if (fromDeck) {
      this.handleDropFromDeck(foundation);
      return;
    }

    const pile = this.piles[pileIndex];
    const card = pile.cards[cardIndex];

    if (card && foundation && foundation.canAdd(card)) {
      foundation.add(card);
      pile.remove(card);
      pile.revealLastCard();
    }
  };
}

const store = new KlonditeSolitaireStore();
const storeContext = createContext(store);
const useStore = () => useContext(storeContext);

export { useStore };
