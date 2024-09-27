"use client";

import { useState, useEffect } from "react";
import { Button } from "rebass";

type Cell = {
  isMine: boolean;
  isRevealed: boolean;
  isFlagged: boolean;
  neighborMines: number;
};

export default function Minesweeper({
  width = 10,
  height = 10,
  mineCount = 10,
}) {
  const [grid, setGrid] = useState<Cell[][]>([]);
  const [gameStatus, setGameStatus] = useState<"playing" | "won" | "lost">(
    "playing"
  );
  const [flagsLeft, setFlagsLeft] = useState(mineCount);

  useEffect(() => {
    initializeGame();
  }, []);

  const initializeGame = () => {
    const newGrid: Cell[][] = Array(height)
      .fill(null)
      .map(() =>
        Array(width)
          .fill(null)
          .map(() => ({
            isMine: false,
            isRevealed: false,
            isFlagged: false,
            neighborMines: 0,
          }))
      );

    // Place mines
    let minesToPlace = mineCount;
    while (minesToPlace > 0) {
      const randomRow = Math.floor(Math.random() * height);
      const randomCol = Math.floor(Math.random() * width);
      if (!newGrid[randomRow][randomCol].isMine) {
        newGrid[randomRow][randomCol].isMine = true;
        minesToPlace--;
      }
    }

    // Calculate neighbor mines
    for (let row = 0; row < height; row++) {
      for (let col = 0; col < width; col++) {
        if (!newGrid[row][col].isMine) {
          let count = 0;
          for (let r = -1; r <= 1; r++) {
            for (let c = -1; c <= 1; c++) {
              if (
                row + r >= 0 &&
                row + r < height &&
                col + c >= 0 &&
                col + c < width
              ) {
                if (newGrid[row + r][col + c].isMine) count++;
              }
            }
          }
          newGrid[row][col].neighborMines = count;
        }
      }
    }

    setGrid(newGrid);
    setGameStatus("playing");
    setFlagsLeft(mineCount);
  };

  const handleCellClick = (row: number, col: number) => {
    if (gameStatus !== "playing") return;
    if (grid[row][col].isFlagged) return;

    const newGrid = [...grid];
    if (newGrid[row][col].isMine) {
      // Game over - reveal the clicked mine
      newGrid[row][col].isRevealed = true;
      setGrid(newGrid);
      revealAllMines();
      setGameStatus("lost");
    } else {
      revealCell(row, col, newGrid);
      if (checkWinCondition()) {
        setGameStatus("won");
      }
      setGrid(newGrid);
    }
  };

  const handleCellRightClick = (
    e: React.MouseEvent,
    row: number,
    col: number
  ) => {
    e.preventDefault();
    if (gameStatus !== "playing" || grid[row][col].isRevealed) return;

    const newGrid = [...grid];
    const cell = newGrid[row][col];

    if (!cell.isFlagged && flagsLeft > 0) {
      cell.isFlagged = true;
      setFlagsLeft(flagsLeft - 1);
    } else if (cell.isFlagged) {
      cell.isFlagged = false;
      setFlagsLeft(flagsLeft + 1);
    }

    setGrid(newGrid);

    if (checkWinCondition()) {
      setGameStatus("won");
    }
  };

  const revealCell = (row: number, col: number, grid: Cell[][]) => {
    if (
      row < 0 ||
      row >= height ||
      col < 0 ||
      col >= width ||
      grid[row][col].isRevealed ||
      grid[row][col].isFlagged
    )
      return;

    grid[row][col].isRevealed = true;

    if (grid[row][col].neighborMines === 0) {
      for (let r = -1; r <= 1; r++) {
        for (let c = -1; c <= 1; c++) {
          revealCell(row + r, col + c, grid);
        }
      }
    }
  };

  const revealAllMines = () => {
    const newGrid = grid.map((row) =>
      row.map((cell) => (cell.isMine ? { ...cell, isRevealed: true } : cell))
    );
    setGrid(newGrid);
  };

  const checkWinCondition = () => {
    return grid.every((row) =>
      row.every(
        (cell) =>
          (cell.isRevealed && !cell.isMine) || (!cell.isRevealed && cell.isMine)
      )
    );
  };

  const getCellContent = (cell: Cell) => {
    if (cell.isFlagged) return "🚩";
    if (!cell.isRevealed) return "";
    if (cell.isMine) return "💣";
    return cell.neighborMines > 0 ? cell.neighborMines : "";
  };

  const getCellColor = (cell: Cell) => {
    if (!cell.isRevealed) return "bg-gray-200 hover:bg-gray-300";
    if (cell.isMine) return "bg-black";
    return "bg-gray-100";
  };

  return (
    <div className="flex flex-col items-center justify-center ">
      <div className="my-4 flex px-4 justify-between w-full max-w-md">
        <Button className="bg-black mt-2" onClick={initializeGame}>
          New Game
        </Button>
        <div className="text-xl font-bold">Flags left: {flagsLeft}</div>
      </div>
      <div
        className="bg-white p-4 rounded-lg shadow-lg"
        onContextMenu={(e) => e.preventDefault()}
      >
        {grid.map((row, rowIndex) => (
          <div key={rowIndex} className="flex">
            {row.map((cell, colIndex) => (
              <button
                key={`${rowIndex}-${colIndex}`}
                className={`${
                  window.innerWidth > 1000 ? "w-12 h-12" : "w-7 h-7"
                } border border-gray-300 flex items-center justify-center font-bold ${getCellColor(
                  cell
                )}`}
                onClick={() => handleCellClick(rowIndex, colIndex)}
                onContextMenu={(e) =>
                  handleCellRightClick(e, rowIndex, colIndex)
                }
                disabled={gameStatus !== "playing" || cell.isRevealed}
                aria-label={`Cell ${rowIndex}-${colIndex}`}
              >
                {getCellContent(cell)}
              </button>
            ))}
          </div>
        ))}
      </div>
      {gameStatus !== "playing" && (
        <div className="absolute inset-0 flex flex-col gap-2 items-center justify-center h-screen mt-[-3rem] bg-black bg-opacity-50">
          <div
            className={`mt-4 text-2xl font-bold ${
              gameStatus === "won" ? "text-green-600" : "text-red-600"
            }`}
          >
            {gameStatus === "won" ? "You Won!" : "Game Over!"}
          </div>
          <Button className="bg-black mt-2" onClick={initializeGame}>
            Play Again
          </Button>
        </div>
      )}
    </div>
  );
}
