"use client";

import React, { useState, useEffect, useCallback } from "react";
import Swipe from "react-easy-swipe";
import { Button } from "rebass";

type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT";
type Position = { x: number; y: number };

const GRID_SIZE = 20;
const INITIAL_SNAKE: Position[] = [{ x: 10, y: 10 }];
const INITIAL_DIRECTION: Direction = "RIGHT";
const INITIAL_FOOD: Position = { x: 15, y: 15 };
const GAME_SPEED = 100;

export default function SnakeGame() {
  const CELL_SIZE =
    (window.innerWidth > 400 ? 400 : window.innerWidth) / GRID_SIZE;

  const [snake, setSnake] = useState<Position[]>(INITIAL_SNAKE);
  const [direction, setDirection] = useState<Direction>(INITIAL_DIRECTION);
  const [food, setFood] = useState<Position>(INITIAL_FOOD);
  const [gameOver, setGameOver] = useState(true);
  const [score, setScore] = useState(0);
  const [initialGame, setInitialGame] = useState(1);

  const moveSnake = useCallback(() => {
    const newSnake = [...snake];
    const head = { ...newSnake[0] };

    switch (direction) {
      case "UP":
        head.y -= 1;
        break;
      case "DOWN":
        head.y += 1;
        break;
      case "LEFT":
        head.x -= 1;
        break;
      case "RIGHT":
        head.x += 1;
        break;
    }

    if (
      head.x < 0 ||
      head.x >= GRID_SIZE ||
      head.y < 0 ||
      head.y >= GRID_SIZE
    ) {
      setGameOver(true);
      return;
    }

    if (
      newSnake.some((segment) => segment.x === head.x && segment.y === head.y)
    ) {
      setGameOver(true);
      return;
    }

    newSnake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
      setScore((prevScore) => prevScore + 1);
      generateFood(newSnake);
    } else {
      newSnake.pop();
    }

    setSnake(newSnake);
  }, [snake, direction, food]);

  const generateFood = (currentSnake: Position[]) => {
    let newFood: Position;
    do {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      };
    } while (
      currentSnake.some(
        (segment) => segment.x === newFood.x && segment.y === newFood.y
      )
    );
    setFood(newFood);
  };

  const handleKeyPress = useCallback((e: KeyboardEvent) => {
    switch (e.key) {
      case "ArrowUp":
        setDirection((prev) => (prev !== "DOWN" ? "UP" : prev));
        break;
      case "ArrowDown":
        setDirection((prev) => (prev !== "UP" ? "DOWN" : prev));
        break;
      case "ArrowLeft":
        setDirection((prev) => (prev !== "RIGHT" ? "LEFT" : prev));
        break;
      case "ArrowRight":
        setDirection((prev) => (prev !== "LEFT" ? "RIGHT" : prev));
        break;
    }
  }, []);

  const handleSwipe = (direction: "UP" | "DOWN" | "LEFT" | "RIGHT") => {
    switch (direction) {
      case "UP":
        setDirection((prev) => (prev !== "DOWN" ? "UP" : prev));
        break;
      case "DOWN":
        setDirection((prev) => (prev !== "UP" ? "DOWN" : prev));
        break;
      case "LEFT":
        setDirection((prev) => (prev !== "RIGHT" ? "LEFT" : prev));
        break;
      case "RIGHT":
        setDirection((prev) => (prev !== "LEFT" ? "RIGHT" : prev));
        break;
    }
  };

  useEffect(() => {
    if (!gameOver) {
      const gameLoop = setInterval(moveSnake, GAME_SPEED);
      return () => clearInterval(gameLoop);
    }
  }, [gameOver, moveSnake]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [handleKeyPress]);

  const resetGame = () => {
    setSnake(INITIAL_SNAKE);
    setDirection(INITIAL_DIRECTION);
    generateFood(INITIAL_SNAKE);
    setGameOver(false);
    setScore(0);

    if (initialGame) {
      setInitialGame(0);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-4 text-primary">Snake Game</h1>
      <div className="mb-4 text-xl font-semibold text-primary">
        Score: {score}
      </div>
      <Swipe
        onSwipeDown={() => handleSwipe("DOWN")}
        onSwipeLeft={() => handleSwipe("LEFT")}
        onSwipeRight={() => handleSwipe("RIGHT")}
        onSwipeUp={() => handleSwipe("UP")}
        className="overflow-y-hidden"
      >
        <div
          className="border-2 bg-gray-100 border-primary rounded-lg shadow-lg overflow-hidden"
          style={{
            width: GRID_SIZE * CELL_SIZE + 5,
            height: GRID_SIZE * CELL_SIZE + 5,
            maxWidth: "100vw",
            position: "relative",
            backgroundImage:
              "linear-gradient(#e5e7eb 1px, transparent 1px), linear-gradient(90deg, #e5e7eb 1px, transparent 1px)",
            backgroundSize: `${CELL_SIZE}px ${CELL_SIZE}px`,
          }}
        >
          {snake.map((segment, index) => (
            <div
              key={index}
              className={`absolute rounded-full shadow-sm transition-all duration-100 ${
                index === 0
                  ? "bg-green-700"
                  : "bg-gradient-to-r from-green-500 to-green-600"
              }`}
              style={{
                left: segment.x * CELL_SIZE,
                top: segment.y * CELL_SIZE,
                width: CELL_SIZE,
                height: CELL_SIZE,
                zIndex: snake.length - index,
              }}
            />
          ))}
          <div
            className="absolute bg-red-500 rounded-full shadow-sm"
            style={{
              left: food.x * CELL_SIZE,
              top: food.y * CELL_SIZE,
              width: CELL_SIZE,
              height: CELL_SIZE,
            }}
          />
        </div>
      </Swipe>
      {gameOver && (
        <div className="mt-4 text-center">
          {!initialGame && (
            <p className="text-2xl font-bold mb-2 text-primary">Game Over!</p>
          )}
          <Button onClick={resetGame} className="bg-black mt-2">
            {!initialGame ? "Restart Game" : "Start Game"}
          </Button>
        </div>
      )}
      <div className="mt-4 text-sm text-gray-600">
        Use arrow keys or swipe gestures to control the snake
      </div>
    </div>
  );
}
