import { useState, useEffect } from "react";
import CARD_INFO from "@/constants/klondikeSolitaire";

import "./index.css";
import { ICard } from "@/interfaces/klonditeSolitaire";

interface CardProps {
  card: ICard;
  isDown: boolean;
  isHighlighted: boolean;
  isSelected: boolean;
}

function Card({ card, isSelected, isDown, isHighlighted }: CardProps) {
  const [down, setdown] = useState("");
  const [select, setselect] = useState("");
  const [highlight, sethighlight] = useState("");
  useEffect(() => {
    if (isDown) {
      setdown(" card__down");
    } else {
      setdown(" " + card.suit);
    }
    if (isSelected) {
      setselect(" card__selected");
    } else {
      setselect("");
    }
    if (isHighlighted) {
      sethighlight(" card__highlighted");
    } else {
      sethighlight("");
    }
  }, [isDown, isSelected, isHighlighted, card.suit]);
  return (
    <div className={"card" + down + select + highlight}>
      <div className="card__content card__rank-left">{card.rank}</div>
      <div className="card__content card__suite-left">
        {CARD_INFO["symbol"][card.suit]}
      </div>
      <div className="card__content card__suite-right">
        {CARD_INFO["symbol"][card.suit]}
      </div>
      <div className="card__content card__rank-right">{card.rank}</div>
    </div>
  );
}

export default Card;
