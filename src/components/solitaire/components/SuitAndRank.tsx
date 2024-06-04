import { SUITS } from "@/constants/solitaire";
import { Ranks, SuitCards } from "@/interfaces/solitaire";
import React, { CSSProperties } from "react";

const SuitAndRank = ({
  suit,
  rank,
  position,
}: {
  suit: SuitCards;
  rank: Ranks;
  position: CSSProperties;
}) => {
  return (
    <div
      style={{
        ...position,
        display: "inline-block",
        position: "absolute",
        textAlign: "center",
        transform: "bottom" in position ? "rotate(180deg)" : '',
      }}
    >
      <div>{rank}</div>
      <div style={{ position: "relative", top: -5 }}>{SUITS[suit]}</div>
    </div>
  );
};

export default SuitAndRank;
