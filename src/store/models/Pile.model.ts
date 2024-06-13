import { observable } from "mobx";
import { DragEvent } from "react";

import { CardModel } from "./Card.model";
import { RANK, RANK_VALUES } from "@/constants/klondikeSolitaire";
import { TOnCardDropFn } from "@/interfaces/klonditeSolitaire";

export class PileModel {
  cards = observable<CardModel>([]);

  get hasCards() {
    return this.cards.length > 0;
  }

  get lastCard(): CardModel | undefined {
    return this.hasCards ? this.cards[this.cards.length - 1] : undefined;
  }

  get firstCard(): CardModel | undefined {
    return this.hasCards ? this.cards[0] : undefined;
  }

  add = (card: CardModel): void => {
    this.cards.push(card);
  };

  pop = (): CardModel | undefined => {
    return this.cards.pop();
  };

  remove = (card: CardModel): void => {
    this.cards = JSON.parse(
      JSON.stringify(
        this.cards.filter((c) => c.rank !== card.rank && c.suit !== card.suit)
      )
    );
  };

  clear = () => {
    this.cards.clear();
  };

  shuffle = () => {
    for (let i = this.cards.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));

      const temp = this.cards[i];
      this.cards[i] = this.cards[j];
      this.cards[j] = temp;
    }
  };

  canAdd = (card: CardModel) => {
    if (!this.lastCard) {
      return card.rank === RANK.KING;
    }

    const cardRank = RANK_VALUES.indexOf(card.rank);
    const cardLastRank = RANK_VALUES.indexOf(this.lastCard.rank);

    const isColorDifferent = card.isBlack !== this.lastCard.isBlack;
    const isRankBelow = cardRank === cardLastRank - 1;

    return isColorDifferent && isRankBelow;
  };

  revealLastCard = () => {
    this.lastCard?.reveal();
  };

  handleCardDrag = (event: DragEvent, index: number) => {
    const target = event.target as HTMLDivElement;

    const cardIndex = target.getAttribute("data-index");
    const pileIndex = index.toString();

    event.dataTransfer.setData("cardIndex", cardIndex!);
    event.dataTransfer.setData("pileIndex", pileIndex);
  };

  handleCardDrop = (
    event: DragEvent,
    index: number,
    onCardDrop?: TOnCardDropFn
  ) => {
    if (!onCardDrop) {
      return;
    }

    const cardIndex = event.dataTransfer.getData("cardIndex");
    const pileIndexFrom = event.dataTransfer.getData("pileIndex");
    const isFromDeck = event.dataTransfer.getData("isFromDeck");

    onCardDrop(
      Boolean(isFromDeck),
      Number(cardIndex),
      Number(pileIndexFrom),
      index
    );
  };
}
