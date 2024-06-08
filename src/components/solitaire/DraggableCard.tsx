import React from "react";
import { useDrag, useDrop } from "react-dnd";
import Card from "../display/Card.jsx";
import { Ranks, Suits, RanksValues, Places, Colors } from "../../constants";
import ActionCreators from "../../actions";

const cardType = "DraggableCard";

function useCardDrag() {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: cardType,
    item: {
      suit: props.suit,
      rank: props.rank,
      where: props.where,
      upturned: props.upturned,
      isLast: props.isLast,
      index: props.index,
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

      if (destination === Places.FOUNDATION) {
        return (
          draggedCard.suit === suit &&
          RanksValues[draggedCard.rank] === RanksValues[rank] + 1 &&
          ((draggedCard.where[0] === Places.PILE && draggedCard.isLast) ||
            draggedCard.where[0] === Places.DECK)
        );
      } else if (destination === Places.PILE) {
        return (
          props.isLast &&
          Colors[draggedCard.suit] !== Colors[suit] &&
          RanksValues[draggedCard.rank] === RanksValues[rank] - 1
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

const DraggableCard = ({ rank, suit, upturned, dispatch }) => {
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

DraggableCard.propTypes = {
  rank: React.PropTypes.oneOf(Ranks),
  suit: React.PropTypes.oneOf(Object.keys(Suits)),
  upturned: React.PropTypes.bool,
};

export default DraggableCard;
