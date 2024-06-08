import React, { useState, useEffect } from "react";
import T from "prop-types";
import Foundation from "../display/Foundation.jsx";
import ActionCreators, { Directions } from "../../actions";
import DraggableCard from "./DraggableCard.jsx";
import first from "lodash/first";
import { Suits } from "../../constants";
import { useDrop } from "react-dnd";

const foundationTarget = {
  drop: (props, monitor) => {
    props.moveCards(monitor.getItem());
  },
  canDrop: (props, monitor) => {
    const { suit, rank } = monitor.getItem();
    const firstCard = first(props.cards);
    return suit === props.suit && firstCard === undefined && rank === "A";
  },
};

const SmartFoundation = ({ cards, suit, moveCards }) => {
  const [isOver, setIsOver] = useState(false);
  const [canDrop, setCanDrop] = useState(false);

  const [{ connectDropTarget }, monitor] = useDrop(
    foundationTarget,
    (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    })
  );

  useEffect(() => {
    setIsOver(monitor.isOver());
    setCanDrop(monitor.canDrop());
  }, [monitor.isOver(), monitor.canDrop()]);

  const handleMoveCards = (card) => {
    moveCards([card], { from: card.where, to: ["FOUNDATION", suit] });
  };

  const card = cards.length ? (
    <DraggableCard
      {...cards[cards.length - 1]}
      upturned
      where={["FOUNDATION", suit]}
    />
  ) : null;

  return connectDropTarget(
    <div>
      <Foundation {...props} isOver={isOver} canDrop={canDrop} />
      {card}
    </div>
  );
};

SmartFoundation.propTypes = {
  cards: T.array,
  suit: T.oneOf(Object.keys(Suits)),
  moveCards: T.func.isRequired,
};

export default SmartFoundation;
