import React from "react";
import { useDrop } from "react-dnd";
import Pile from "./components/Pile";
import Card from "./components/Card";
import DraggableCard from "./DraggableCard";
import { SUITS, RANKS, COLORS } from "@/constants/solitaire";
import last from "lodash/last";

const pileTarget = {
  drop(props, monitor) {
    props.moveCards(monitor.getItem());
  },

  canDrop(props, monitor) {
    const { rank } = monitor.getItem();
    return rank === last(RANKS) && props.cards.length === 0;
  },
};

function collect(monitor) {
  return {
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop(),
    suit: monitor.getItem() && monitor.getItem().suit,
  };
}

const SmartPile = ({ cards, moveCards, index }) => {
  const [{ isOver, canDrop, suit }] = useDrop(
    "DraggableCard",
    pileTarget,
    collect
  );

  const renderedCards = cards.map((card, index, array) => {
    if (card.upturned) {
      return (
        <DraggableCard
          key={card.suit + card.rank}
          {...card}
          isLast={index === array.length - 1}
          index={index}
          upturned
          where={["PILE", index]}
        />
      );
    } else {
      return <Card key={card.suit + card.rank} {...card} />;
    }
  });

  return (
    <div>
      <Pile isOver={isOver} canDrop={canDrop} color={COLORS[suit]}>
        {renderedCards}
      </Pile>
    </div>
  );
};

SmartPile.propTypes = {
  cards: PropTypes.arrayOf(
    PropTypes.shape({
      rank: PropTypes.oneOf(RANKS),
      suit: PropTypes.oneOf(Object.keys(SUITS)),
      upturned: PropTypes.bool,
    })
  ),
  moveCards: PropTypes.func,
  index: PropTypes.number,
};

export default SmartPile;
