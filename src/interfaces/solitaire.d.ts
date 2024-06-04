export type Suits = {
  SPADES: "♠";
  HEARTS: "♥";
  DIAMONDS: "♦";
  CLUBS: "♣";
};

export type Ranks =
  | "A"
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "9"
  | "10"
  | "J"
  | "Q"
  | "K";

export type RanksValues = {
  A: 1,
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9,
  10: 10,
  J: 11,
  Q: 12,
  K: 13,
};

export type Places = {
  FOUNDATION: "FOUNDATION",
  PILE: "PILE",
  DECK: "DECK",
};

export type ActionTypes = {
  TURN_CARD: "TURN_CARD",
  MOVE_CARD: "MOVE_CARD",
};

export type Colors = {
  SPADES: "#212121",
  HEARTS: "#FF5722",
  DIAMONDS: "#FF5722",
  CLUBS: "#212121",

  OK: "green",
  KO: "red",

  Card: {
    upturned: "white",
    downturned: "#1976D2",
    borderColorUp: "#B6B6B6",
    borderColorDown: "#1976D2",
  },

  Game: {
    backgroundColor: "#4CAF50",
  },

  Foundation: {
    backgroundColor: "#388E3C",
  },

  React: "#00d8ff",
};

export type Shadows = {
  Level1: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
  Level2: "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)",
  Level3: "0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)",
  Level4: "0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)",
  Level5: "0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22)",
};

export type Dimensions = {
  Card: {
    width: 125,
    height: 175,
    borderRadius: 2,
  },

  Game: {
    width: 957,
    height: 500,
  },
};
