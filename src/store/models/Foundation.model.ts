import { CardModel } from "./Card.model";
import { PileModel } from "./Pile.model";
import { RANK, RANK_VALUES } from "@/constants/klondikeSolitaire";
import { DragEvent } from "react";
import { TOnCardDropFn } from "@/interfaces/klonditeSolitaire";

export class FoundationModel extends PileModel {
  get isDone() {
    return this.cards.length === RANK_VALUES.length;
  }

  canAdd = (card: CardModel) => {
    if (!this.lastCard) {
      return card.rank === RANK.ACE;
    }

    const cardRank = RANK_VALUES.indexOf(card.rank);
    const cardLastRank = RANK_VALUES.indexOf(this.lastCard.rank);

    const isSameSuit = card.suit === this.lastCard.suit;
    const isRankAbove = cardRank === cardLastRank + 1;

    return isSameSuit && isRankAbove;
  };

  handleDrop = (
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
