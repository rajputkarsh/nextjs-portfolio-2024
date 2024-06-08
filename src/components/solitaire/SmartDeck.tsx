import React, { useState } from "react";
import T from "prop-types";
import Card from "../display/Card.jsx";
import { Suits, Ranks } from "../../constants";
import UpturnedCard from "../display/UpturnedCard.jsx";
import Deck from "../display/Deck.jsx";
import { List } from "immutable";
import DraggableCard from "./DraggableCard.jsx";
import last from "lodash/last";
import { Places } from "../../constants";

const SmartDeck = ({ deck, turnCard }) => {
  const [lastUpturnedCard, setLastUpturnedCard] = useState(
    last(deck.upturned) || { rank: null, suit: null, upturned: false }
  );

  const handleTurnCard = () => {
    turnCard();
    const newLastCard = last(deck.upturned);
    setLastUpturnedCard(newLastCard);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        width: 264,
      }}
    >
      <Deck onClick={handleTurnCard}>
        <Card />
      </Deck>
      <UpturnedCard>
        <DraggableCard
          {...lastUpturnedCard}
          upturned
          where={[Places.DECK, "upturned"]}
        />
      </UpturnedCard>
    </div>
  );
};

SmartDeck.propTypes = {
  deck: T.shape({
    upturned: T.arrayOf(
      T.shape({
        rank: T.oneOf(Ranks),
        suit: T.oneOf(Object.keys(Suits)),
        upturned: T.bool,
      })
    ),
    downturned: T.arrayOf(
      T.shape({
        rank: T.oneOf(Ranks),
        suit: T.oneOf(Object.keys(Suits)),
        upturned: T.bool,
      })
    ),
  }),
};

export default SmartDeck;
