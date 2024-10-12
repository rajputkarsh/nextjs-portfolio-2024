"use client";

import React, { useState, useEffect, useCallback } from "react";
import Swipe from "react-easy-swipe";
import { motion } from "framer-motion";
import { Button } from "rebass";

// Tetromino shapes
const TETROMINOS = {
  I: { shape: [[1, 1, 1, 1]], color: "cyan" },
  J: {
    shape: [
      [1, 0, 0],
      [1, 1, 1],
    ],
    color: "blue",
  },
  L: {
    shape: [
      [0, 0, 1],
      [1, 1, 1],
    ],
    color: "orange",
  },
  O: {
    shape: [
      [1, 1],
      [1, 1],
    ],
    color: "yellow",
  },
  S: {
    shape: [
      [0, 1, 1],
      [1, 1, 0],
    ],
    color: "green",
  },
  T: {
    shape: [
      [0, 1, 0],
      [1, 1, 1],
    ],
    color: "purple",
  },
  Z: {
    shape: [
      [1, 1, 0],
      [0, 1, 1],
    ],
    color: "red",
  },
};

const BOARD_WIDTH = 10;
const BOARD_HEIGHT = 20;

type TetrominoKey = keyof typeof TETROMINOS;


const createEmptyBoard = () =>
  Array.from({ length: BOARD_HEIGHT }, () => Array(BOARD_WIDTH).fill(0));

const randomTetromino = () => {
  const keys = Object.keys(
    TETROMINOS
  ) as Array<TetrominoKey>;
  const randKey = keys[Math.floor(Math.random() * keys.length)];
  return TETROMINOS[randKey];
};

export default function TetrisGame() {
  const [board, setBoard] = useState<Array<Array<any>>>(createEmptyBoard());
  const [currentPiece, setCurrentPiece] = useState({
    tetromino: randomTetromino(),
    position: { x: 4, y: 0 },
  });
  const [score, setScore] = useState<number>(0);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [clearedLines, setClearedLines] = useState<Array<any>>([]);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const startGame = () => {
    setBoard(createEmptyBoard());
    setCurrentPiece({ tetromino: randomTetromino(), position: { x: 4, y: 0 } });
    setScore(0);
    setGameOver(false);
    setClearedLines([]);
    setIsPlaying(true);
  };

  const pauseGame = () => {
    setIsPlaying(false);
  };

  const resumeGame = () => {
    setIsPlaying(true);
  };

  const moveDown = useCallback(() => {
    if (!collision(currentPiece, board, { x: 0, y: 1 })) {
      setCurrentPiece((prev) => ({
        ...prev,
        position: { ...prev.position, y: prev.position.y + 1 },
      }));
    } else {
      if (currentPiece.position.y <= 0) {
        setGameOver(true);
        setIsPlaying(false);
        return;
      }
      setBoard((prev) => placePiece(prev, currentPiece));
      setCurrentPiece({
        tetromino: randomTetromino(),
        position: { x: 4, y: 0 },
      });
    }
  }, [currentPiece, board]);

  const moveHorizontally = (direction:  -1 | 1) => {
    if (!collision(currentPiece, board, { x: direction, y: 0 })) {
      setCurrentPiece((prev) => ({
        ...prev,
        position: { ...prev.position, x: prev.position.x + direction },
      }));
    }
    setTimeout(moveDown, 400);
  };

  const rotate = () => {
    const rotated = {
      ...currentPiece,
      tetromino: {
        ...currentPiece.tetromino,
        shape: rotateTetromino(currentPiece.tetromino.shape),
      },
    };
    if (!collision(rotated, board, { x: 0, y: 0 })) {
      setCurrentPiece(rotated);
      setTimeout(moveDown, 400);
    }
  };

  const rotateTetromino = (matrix: Array<Array<number>>) => {
    const rows = matrix.length;
    const columns = matrix[0].length;
    const rotated = Array.from({ length: columns }, () => Array(rows).fill(0));
    for (let row = 0; row < rows; row++) {
      for (let column = 0; column < columns; column++) {
        rotated[column][rows - 1 - row] = matrix[row][column];
      }
    }
    return rotated;
  };

  const collision = (piece: typeof currentPiece, board: Array<Array<any>>, movement: {x: number, y: number}) => {
    for (let y = 0; y < piece.tetromino.shape.length; y++) {
      for (let x = 0; x < piece.tetromino.shape[y].length; x++) {
        if (piece.tetromino.shape[y][x] !== 0) {
          const newX = piece.position.x + x + movement.x;
          const newY = piece.position.y + y + movement.y;
          if (newX < 0 || newX >= BOARD_WIDTH || newY >= BOARD_HEIGHT)
            return true;
          if (newY >= 0 && board[newY][newX] !== 0) return true;
        }
      }
    }
    return false;
  };

  const placePiece = (board: Array<Array<any>>, piece: typeof currentPiece) => {
    const newBoard = [...board];
    piece.tetromino.shape.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value !== 0) {
          newBoard[y + piece.position.y][x + piece.position.x] =
            piece.tetromino.color;
        }
      });
    });
    const [clearedBoard, linesCleared] = clearLines(newBoard);
    setClearedLines(linesCleared);
    setScore((prev) => prev + linesCleared.length * 100);
    return clearedBoard;
  };

  const clearLines = (board: Array<Array<any>>) => {
    const clearedLines: any[] = [];
    const newBoard = board.reduce((acc, row, index) => {
      if (row.every((cell) => cell !== 0)) {
        clearedLines.push(index);
        acc.unshift(Array(BOARD_WIDTH).fill(0));
      } else {
        acc.push(row);
      }
      return acc;
    }, []);
    return [newBoard, clearedLines];
  };

  const handleSwipe = (direction: "UP" | "DOWN" | "LEFT" | "RIGHT") => {
    switch (direction) {
      case "UP":
        rotate();
        break;
      case "DOWN":
        moveDown();
        break;
      case "LEFT":
        moveHorizontally(-1);
        break;
      case "RIGHT":
        moveHorizontally(1);
        break;
    }
  };

  useEffect(() => {
    if (!isPlaying) return;
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") moveHorizontally(-1);
      if (e.key === "ArrowRight") moveHorizontally(1);
      if (e.key === "ArrowDown") moveDown();
      if (e.key === "ArrowUp") rotate();
    };
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [isPlaying, moveDown]);

  useEffect(() => {
    if (!isPlaying) return;
    const gameLoop = setInterval(moveDown, 1000);
    return () => {
      clearInterval(gameLoop);
    };
  }, [isPlaying, moveDown]);

  useEffect(() => {
    if (clearedLines.length > 0) {
      const timer = setTimeout(() => {
        setClearedLines([]);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [clearedLines]);

  return (
    <div className="flex flex-col items-center justify-center">
      {" "}
      {window.innerWidth > 1000 ? (
        <div className="flex gap-12 justify-between mb-1 text-2xl text-primary">
          <h1 className="font-bold">Tetris</h1>
          <span className="font-semibold"> Score: {score}</span>
        </div>
      ) : null}
      <Swipe
        onSwipeDown={() => handleSwipe("DOWN")}
        onSwipeLeft={() => handleSwipe("LEFT")}
        onSwipeRight={() => handleSwipe("RIGHT")}
        onSwipeUp={() => handleSwipe("UP")}
        className="overflow-y-hidden"
      >
        <div className="bg-white p-2 rounded-lg shadow-lg">
          <div className="relative">
            <div className="grid grid-cols-10 bg-gray-200">
              {board.map((row, y) =>
                row.map((cell, x) => (
                  <motion.div
                    key={`${y}-${x}`}
                    className={`box-border border border-1 w-6 h-6 ${
                      cell ? `bg-${cell}-500` : "bg-gray-100"
                    }`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                ))
              )}
              {isPlaying &&
                currentPiece.tetromino.shape.map((row, y) =>
                  row.map(
                    (cell, x) =>
                      cell !== 0 && (
                        <motion.div
                          key={`piece-${y}-${x}`}
                          className={`w-6 h-6 box-border border border-1 absolute bg-${currentPiece.tetromino.color}-500`}
                          style={{
                            left: `${(currentPiece.position.x + x) * 1.5}rem`,
                            top: `${(currentPiece.position.y + y) * 1.5}rem`,
                          }}
                          initial={{ opacity: 0, y: -30 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                        />
                      )
                  )
                )}
              {clearedLines.map((line) => (
                <motion.div
                  key={`clear-${line}`}
                  className="absolute left-0 right-0 bg-white"
                  style={{ top: `${line * 1.5}rem`, height: "1.5rem" }}
                  initial={{ scaleX: 1 }}
                  animate={{ scaleX: 0 }}
                  transition={{ duration: 0.5 }}
                />
              ))}
            </div>
          </div>
          {gameOver && (
            <div className="absolute inset-0 flex flex-col gap-2 items-center justify-center h-screen mt-[-3rem] bg-black bg-opacity-50">
              <div className="text-white text-2xl font-bold">Game Over</div>{" "}
              {!isPlaying && (
                <Button className="bg-black mt-2" onClick={startGame}>
                  Play Again
                </Button>
              )}
            </div>
          )}
        </div>
      </Swipe>
      <div className="mt-4 space-x-4">
        {!isPlaying && !gameOver && (
          <Button className="bg-black mt-2" onClick={startGame}>
            Start Game
          </Button>
        )}
        {isPlaying && (
          <Button className="bg-black mt-2" onClick={pauseGame}>
            Reset
          </Button>
        )}

        {!isPlaying && !gameOver && score > 0 && (
          <Button className="bg-black mt-2" onClick={resumeGame}>
            Resume
          </Button>
        )}
      </div>
    </div>
  );
}
