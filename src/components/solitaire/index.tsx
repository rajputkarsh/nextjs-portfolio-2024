'use client';
import { AppState } from "@/redux";
import { useSelector, useDispatch } from "react-redux";
import SmartDeck from "./SmartDeck";
import SmartPile from "./SmartPile";
import SmartFoundation from "./SmartFoundation";
import { DndProvider } from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import range from "lodash/range";
import { getSolitaireGame, getSolitaireScore, moveCard, turnCard } from "@/redux/slices/solitaire.slice";
import { COLORS, DIMENSIONS } from "@/constants/solitaire";

const Game = () => {
  const dispatch = useDispatch();

  const game = useSelector<AppState, { [key: string]: any }>(getSolitaireGame);
  const score = useSelector<AppState, { [key: string]: any }>(getSolitaireScore);

  const handleTurnCard = () => {
    dispatch(turnCard({}));
  };

  const handleMoveCards = (cards: any, where: any) => {
    dispatch(moveCard({ cards, where }));
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div
        style={{
          width: DIMENSIONS.Game.width,
          height: DIMENSIONS.Game.height,
          backgroundColor: COLORS.Game.backgroundColor,
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
