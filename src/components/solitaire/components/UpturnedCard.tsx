"use client";

import { ReactNode } from "react";
import { COLORS, DIMENSIONS } from "@/constants/solitaire";
import ReactSymbol from "./ReactSymbol";
import { prefix } from "inline-style-prefixer";

const UpturnedCard = ({ children }: { children: ReactNode }) => {
  return (
    <div
      style={prefix({
        height: DIMENSIONS.Card.height,
        width: DIMENSIONS.Card.width,
        backgroundColor: COLORS.Foundation.backgroundColor,
        borderRadius: DIMENSIONS.Card.borderRadius,
        color: COLORS.Game.backgroundColor,
        position: "relative",
        userSelect: "none",
      })}
    >
      <ReactSymbol color={COLORS.Game.backgroundColor} />
      {children}
    </div>
  );
};

export default UpturnedCard;
