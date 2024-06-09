"use client";

import { Children, cloneElement, ReactElement } from "react";
import T from "prop-types";
import RankSymbol from "./RankSymbol";
import { CARDS_LAYOUTS, COLORS, DIMENSIONS } from "@/constants/solitaire.js";

const Pile = ({
  children,
  isOver,
  canDrop,
  color,
}: {
  children: Array<ReactElement>;
  isOver: boolean;
  canDrop: boolean;
  color: string;
}) => {
  let top = -5;

  const cards = Children.map(children, (element, index) => {
    const previousElement = children[index - 1];
    const wasUpturned = previousElement && previousElement.props.upturned;
    top += wasUpturned ? 15 : 5;
    return cloneElement(element, {
      style: {
        top,
        position: "absolute",
      },
    });
  });

  return (
    <div
      style={{
        backgroundColor:
          (isOver && canDrop && COLORS.Card.upturned) ||
          COLORS.Foundation.backgroundColor,
        position: "relative",
        color: (isOver && canDrop && color) || COLORS.Game.backgroundColor,
        height: DIMENSIONS.Card.height + 5 * (cards.length - 1),
        width: DIMENSIONS.Card.width,
        transition: "all 250ms",
      }}
    >
      {cards}
      {!children.length && <RankSymbol style={{}} symbol={CARDS_LAYOUTS.K} />}
    </div>
  );
};

Pile.propTypes = {
  children: T.oneOfType([T.arrayOf(T.element), T.object]),
};

export default Pile;
