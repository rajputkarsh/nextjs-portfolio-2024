import { makeAutoObservable } from "mobx";

import { CardModel } from "./Card.model";
import { PileModel } from "./Pile.model";
import { RANK, SUIT } from "@/constants/klondikeSolitaire";

export class DeckModel {
  pile = new PileModel();
  pileTurned = new PileModel();

  constructor() {
    makeAutoObservable(this);
  }

  get cardUnturned() {
    return this.pile.lastCard;
  }

  get cardTurned() {
    return this.pileTurned.lastCard;
  }

  createCards() {
    for (const rank of Object.values(RANK)) {
      for (const suit of Object.values(SUIT)) {
        const card = new CardModel({
          rank,
          suit,
          isTurned: false,
        });

        this.pile.add(card);
      }
    }
  }

  turnCard = () => {
    const card = this.pile.pop();
    if (card) {
      card.isTurned = true;
      this.pileTurned.add(card);
      return;
    }

    this.resetPile();
  };

  resetPile = () => {
    this.pile.cards.replace(this.pileTurned.cards.reverse());
    this.pileTurned.clear();
    this.pile.cards.forEach((card) => card.hide());
  };

  reset = () => {
    this.pile.clear();
    this.pileTurned.clear();
  };

  initialize = () => {
    this.createCards();
    this.pile.shuffle();
  };
}
