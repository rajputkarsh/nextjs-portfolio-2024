import React from "react";
import { useDrag, useDrop } from "react-dnd";
import Card from "./components/Card";
import {
  RANKS,
  SUITS,
  RANKS_VALUES,
  PLACES,
  COLORS,
} from "@/constants/solitaire";

const cardType = "DraggableCard";

function useCardDrag({ suit, rank, where, upturned, isLast, index }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: cardType,
    item: {
      suit,
      rank,
      where,
      upturned,
      isLast,
      index,
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return { drag, isDragging };
}

function useCardDrop(props, dispatch) {
  const [canDrop, isOver] = useDrop(() => ({
    accept: cardType,
    canDrop(item, monitor) {
      const draggedCard = item;
      const origin = draggedCard.where;
      const destination = first(props.where);

      const { suit, rank } = props;

      if (destination === PLACES.FOUNDATION) {
        return (
          draggedCard.suit === suit &&
          RANKS_VALUES[draggedCard.rank] === RANKS_VALUES[rank] + 1 &&
          ((draggedCard.where[0] === PLACES.PILE && draggedCard.isLast) ||
            draggedCard.where[0] === PLACES.DECK)
        );
      } else if (destination === PLACES.PILE) {
        return (
          props.isLast &&
          COLORS[draggedCard.suit] !== COLORS[suit] &&
          RANKS_VALUES[draggedCard.rank] === RANKS_VALUES[rank] - 1
        );
      }

      return false;
    },
    drop(item, monitor) {
      dispatch(
        ActionCreators.moveCard([item], {
          from: item.where,
          to: props.where,
        })
      );
    },
    collect: (monitor) => ({
      canDrop: monitor.canDrop(),
      isOver: monitor.isOver(),
    }),
  }));

  return { canDrop, isOver };
}

const DraggableCard = ({ rank, suit, upturned, where }) => {
  const { drag, isDragging } = useCardDrag();
  const { canDrop, isOver } = useCardDrop(
    { rank, suit, where: props.where },
    dispatch
  );

  const [isMouseOver, setIsMouseOver] = React.useState(false);

  const onMouseOver = () => setIsMouseOver(true);
  const onMouseOut = () => setIsMouseOver(false);

  return (
    <div onMouseOver={onMouseOver} onMouseOut={onMouseOut}>
      {drag(
        <Card
          {...props}
          isOver={isOver}
          canDrop={canDrop}
          isDragging={isDragging}
          isMouseOver={isMouseOver}
        />
      )}
    </div>
  );
};

export default DraggableCard;
