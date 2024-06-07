import React, { CSSProperties } from "react";
import Overlay from "./Overlay.jsx";
import SuitAndRank from "./SuitAndRank.jsx";
import SuitSymbol from "./SuitSymbol.jsx";
import RankSymbol from "./RankSymbol.jsx";
import ReactSymbol from "./ReactSymbol.jsx";
import {
  SHADOWS,
  COLORS,
  DIMENSIONS,
  CARDS_LAYOUTS,
} from "@/constants/solitaire.js";
import { prefix } from "inline-style-prefixer";
import { Ranks, SuitCards } from "@/interfaces/solitaire.js";

const Card = ({
  rank,
  suit,
  upturned,
  style,
  isOver,
  canDrop,
  isMouseOver,
  isDragging,
}: {
  rank: Ranks;
  suit: SuitCards;
  upturned: boolean | string | null;
  style: CSSProperties;
  isOver: boolean;
  canDrop: boolean;
  isMouseOver: boolean;
  isDragging: boolean;
}) => {
  let suitSymbols;
  let rankSymbol;
  let _style = prefix({
    background: upturned ? COLORS.Card.upturned : COLORS.Card.downturned,
    borderRadius: DIMENSIONS.Card.borderRadius,
    boxShadow: SHADOWS.Level1,
    boxSizing: "border-box",
    color: COLORS[suit],
    fontFamily: "Arial",
    padding: 4,
    position: "relative",
    width: DIMENSIONS.Card.width,
    height: DIMENSIONS.Card.height,
    cursor: upturned ? "grab" : "inherit",
    userSelect: "none",
    transition: "all 250ms",
    ...style,
  }) as CSSProperties;
  if (!upturned) {
    return (
      <div style={_style}>
        <ReactSymbol color={COLORS.React} />
      </div>
    );
  }
  if (!rank || !suit) {
    return <span />;
  }

  if (isMouseOver) {
    _style = {
      ..._style,
      boxShadow: SHADOWS.Level2,
      transform: "translateY(-5px)",
    };
  }
  if (isDragging) _style = { ..._style, opacity: 0.6 };

  if (Array.isArray(CARDS_LAYOUTS[rank])) {
    suitSymbols = CARDS_LAYOUTS[rank].map((style, i) => (
      <SuitSymbol style={style} suit={suit} key={i} />
    ));
  } else rankSymbol = <RankSymbol style={{}} symbol={CARDS_LAYOUTS[rank] as string} />;

  return (
    <div style={_style}>
      {isOver && <Overlay color={(canDrop && COLORS.OK) || COLORS.KO} />}
      <SuitAndRank suit={suit} rank={rank} position={{ top: 4, left: 5 }} />
      <SuitAndRank suit={suit} rank={rank} position={{ bottom: 4, right: 5 }} />
      {suitSymbols}
      {rankSymbol}
    </div>
  );
};

export default Card;
