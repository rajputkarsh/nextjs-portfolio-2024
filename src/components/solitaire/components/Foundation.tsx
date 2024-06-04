"use client";

import { ReactNode } from "react";
import { prefix } from "inline-style-prefixer";
import { SUITS, COLORS } from "@/constants/solitaire";
import { SuitCards } from "@/interfaces/solitaire";

const Foundation = ({
  children,
  suit,
  isOver,
  canDrop,
}: {
  children: ReactNode;
  suit: SuitCards;
  isOver: boolean;
  canDrop: boolean;
}) => {
  const color =
    (isOver && canDrop && COLORS[suit]) || COLORS.Game.backgroundColor;
  return (
    <div
      style={prefix({
        backgroundColor:
          (isOver && canDrop && COLORS.Card.upturned) ||
          COLORS.Foundation.backgroundColor,
        border: "1px solid #388E3C",
        borderRadius: 2,
        boxSizing: "border-box",
        width: 125,
        height: 175,
        position: "relative",
        userSelect: "none",
        transition: "all 250ms",
      })}
    >
      <div
        style={{
          color,
          transition: "all 250ms",
          position: "absolute",
          top: 0,
          left: 0,
          height: 175,
          width: 125,
          lineHeight: "175px",
          textAlign: "center",
          fontSize: 40,
          cursor: "default",
        }}
      >
        {SUITS[suit]}
      </div>
      {children}
    </div>
  );
};

export default Foundation;
