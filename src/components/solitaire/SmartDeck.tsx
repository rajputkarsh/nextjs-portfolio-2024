import React, { useState } from "react";
import Card from "./components/Card";
import UpturnedCard from "./components/UpturnedCard";
import Deck from "./components/Deck";
import DraggableCard from "./DraggableCard";
import last from "lodash/last";

import { PLACES } from "@/constants/solitaire";

interface IDeckProps {
  deck: {
    upturned: any;
    downturned: any;
  };
  turnCard: () => void
}

const SmartDeck = ({ deck, turnCard }: IDeckProps) => {
  const [lastUpturnedCard, setLastUpturnedCard] = useState(
    last(deck.upturned) || { rank: null, suit: null, upturned: false }
  );

  const handleTurnCard = () => {
    turnCard();
    const newLastCard: any = last(deck.upturned);
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
          where={[PLACES.DECK, "upturned"]}
        />
      </UpturnedCard>
    </div>
  );
};

export default SmartDeck;
