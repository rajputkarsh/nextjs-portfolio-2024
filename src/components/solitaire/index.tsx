import React, { useState, useEffect } from "react";
import SmartDeck from "./SmartDeck";
import SmartPile from "./SmartPile";
import SmartFoundation from "./SmartFoundation";
import { DndProvider } from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import range from "lodash/range";
import { useDrag, useDrop } from "react-dnd"; // Import hooks

const Game = ({ game, score, turnCard, moveCards }) => {
  // No need for mapStateToProps/mapDispatchToProps with hooks

  const [currentScore, setCurrentScore] = useState(score); // Manage score state

  useEffect(() => {
    setCurrentScore(score); // Update score on prop change
  }, [score]);

  const handleTurnCard = () => {
    turnCard();
  };

  const handleMoveCards = (cards, where) => {
    moveCards(cards, where);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div
        style={{
          width: Dimensions.Game.width,
          height: Dimensions.Game.height,
          backgroundColor: Colors.Game.backgroundColor,
          padding: 10,
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <SmartDeck deck={game.DECK} turnCard={handleTurnCard} />
          <div
            style={{
              width: 540,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <SmartFoundation
              suit="HEARTS"
              cards={game.FOUNDATION.HEARTS}
              moveCards={handleMoveCards}
            />
            <SmartFoundation
              suit="DIAMONDS"
              cards={game.FOUNDATION.DIAMONDS}
              moveCards={handleMoveCards}
            />
            <SmartFoundation
              suit="CLUBS"
              cards={game.FOUNDATION.CLUBS}
              moveCards={handleMoveCards}
            />
            <SmartFoundation
              suit="SPADES"
              cards={game.FOUNDATION.SPADES}
              moveCards={handleMoveCards}
            />
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            marginTop: 40,
          }}
        >
          {range(0, 6).map((index) => (
            <SmartPile
              cards={game.PILE[index]}
              index={index}
              key={index}
              moveCards={handleMoveCards}
            />
          ))}
        </div>
      </div>
    </DndProvider>
  );
};

// Remove connect and ActionCreators imports

export default Game;
