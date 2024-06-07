import { createSlice, createSelector } from "@reduxjs/toolkit";
import { Map, List } from "immutable";
import { AppState } from "../index";
import { ISolitaireSlice } from "@/interfaces/redux";
import { PLACES, RANKS, SUITS } from "@/constants/solitaire";
import first from "lodash/first";

const POINTS = {
  [PLACES.DECK]: {
    [PLACES.PILE]: 5,
    [PLACES.FOUNDATION]: 10,
  },
  [PLACES.PILE]: {
    [PLACES.FOUNDATION]: 10,
  },
  [PLACES.FOUNDATION]: {
    [PLACES.PILE]: -15,
  },
} as const;

const initialData: ISolitaireSlice = {
  data: {
    game: {},
    score: 0,
  },
  status: "idle",
  error: null,
};

// score
const getPoints = (points: any) => (source: any, target: any) =>
  (points[source][target] !== undefined && points[source][target]) || 0;

function handleCardMove(state: any, action: any) {
  const { where } = action.payload;
  return state + getPoints(POINTS)(first(where.from), first(where.to));
}

// game
export const OrderedDeck = Object.keys(SUITS)
  .map((suit) => RANKS.map((rank) => ({ rank, suit })))
  .flat(1);

function getInitialState(cards: any) {
  return Map({
    [PLACES.FOUNDATION]: Map({
      HEARTS: List(),
      SPADES: List(),
      DIAMONDS: List(),
      CLUBS: List(),
    }),
    [PLACES.PILE]: getPiles(cards),
    [PLACES.DECK]: Map({
      upturned: List(cards.slice(-1)),
      downturned: List(cards.slice(21, -1)),
    }),
  });
}

function getPiles(cards: any) {
  const deck = cards.slice();
  return List(
    [0, 1, 2, 3, 4, 5, 6].map((index) => {
      const pile = deck.splice(0, index + 1);
      return List(
        pile.slice(0, -1).concat([{ ...pile.pop(), upturned: true }])
      );
    })
  );
}

function upturnFirstCard(cards: any) {
  return cards.map((card: any, index: any, pile: any) => {
    if (index === pile.size - 1) {
      return { ...card, upturned: true };
    } else {
      return card;
    }
  });
}

function movingMultipleCardsFromPileToPile(where: any, cards: any) {
  return (
    first(where.from) === PLACES.PILE &&
    first(where.to) === PLACES.PILE &&
    !(first(cards) as any).isLast
  );
}

function handleMoveCards(state: any, action: any) {
  let { cards, where } = action.payload;
  let source = state.getIn(where.from);
  if (movingMultipleCardsFromPileToPile(where, cards)) {
    cards = source.slice((first(cards) as any).index);
  }
  const target = state.getIn(where.to).concat(cards);
  source = source.slice(0, -cards.length);

  if (first(where.from) === PLACES.PILE) source = upturnFirstCard(source);

  return state
    .updateIn(where.to, () => target)
    .updateIn(where.from, () => source);
}

function handleTurnCards(state: any, action: any) {
  let deck = Map();
  const upturnedCards = state.getIn([PLACES.DECK, "upturned"]);
  const downturnedCards = state.getIn([PLACES.DECK, "downturned"]);
  if (downturnedCards.isEmpty()) {
    deck = deck.set("downturned", List(upturnedCards));
    deck = deck.set("upturned", List());
  } else {
    deck = deck.set("downturned", downturnedCards.shift());
    deck = deck.set("upturned", upturnedCards.push(downturnedCards.first()));
  }

  return state.set(PLACES.DECK, deck);
}

export const solitaireSlice = createSlice({
  name: "solitaire",
  initialState: initialData,
  reducers: {
    scoreMoveCard(state, action) {
      state.data.score = handleCardMove(state as any, action);
    },
    moveCard(state, action) {
      state.data.game = handleMoveCards(state as any, action);
    },
    turnCard(state, action) {
      state.data.game = handleTurnCards(state as any, action);
    },
  },
});

// Function to select solitaire slice root state
const selectSolitaireRootState = (state: AppState): ISolitaireSlice =>
  state.solitaire;

export const getSolitaireGame = createSelector<
  [(state: AppState) => ISolitaireSlice],
  { [key: string]: any }
>(
  [selectSolitaireRootState],
  (solitaireState) => solitaireState?.data?.game || {}
);

export const getSolitaireScore = createSelector<
  [(state: AppState) => ISolitaireSlice],
  { [key: string]: any }
>(
  [selectSolitaireRootState],
  (solitaireState) => solitaireState?.data?.score || {}
);

export const { scoreMoveCard } = solitaireSlice.actions;
export default solitaireSlice.reducer;
