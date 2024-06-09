export type CardRank =
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

export type CardSuit = "heart" | "diamond" | "spade" | "club";

export interface ICard {
  rank: CardRank
  suit: CardSuit;
  deck: string;
}
