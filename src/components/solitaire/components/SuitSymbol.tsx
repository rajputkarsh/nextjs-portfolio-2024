"use client";

import { CSSProperties } from "react";
import { SUITS } from "@/constants/solitaire";
import { SuitCards } from "@/interfaces/solitaire";

const SuitSymbol = ({
  suit,
  style,
}: {
  suit: SuitCards;
  style: CSSProperties;
}) => {
  return (
    <div
      style={{
        position: "absolute",
        width: 50,
        fontSize: 40,
        textAlign: "center",
        ...style,
      }}
    >
      {SUITS[suit]}
    </div>
  );
};

export default SuitSymbol;
