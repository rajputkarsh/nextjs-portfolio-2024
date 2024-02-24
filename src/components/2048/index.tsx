import React, { useState, useEffect } from "react";
import { cloneDeep } from "@/utils/common";
import { useEvent } from "./helper";
import Swipe from "react-easy-swipe";
import { INITIAL_DATA } from "@/constants/game_2048";
import config from "@/constants/config";
import Block from "./Block";

type Grid = Array<Array<number>>;

enum ARROW {
  LEFT = "ArrowLeft",
  UP = "ArrowUp",
  RIGHT = "ArrowRight",
  DOWN = "ArrowDown",
}

function Game2048() {
  const [data, setData] = useState<Grid>(INITIAL_DATA);
  const [gameOver, setGameOver] = useState<boolean>(false);

  const initialize = (): void => {
    let newGrid = cloneDeep(data);
    addNumber(newGrid);
    addNumber(newGrid);
    setData(newGrid);
  };

  const addNumber = (newGrid: Grid): void => {
    let added = false;
    let gridFull = false;
    let attempts = 0;
    while (!added) {
      if (gridFull) {
        break;
      }

      let rand1 = Math.floor(Math.random() * 4);
      let rand2 = Math.floor(Math.random() * 4);
      attempts++;
      if (newGrid[rand1][rand2] === 0) {
        newGrid[rand1][rand2] = Math.random() > 0.5 ? 2 : 4;
        added = true;
      }
      if (attempts > 50) {
        gridFull = true;
        let gameOver = checkIfGameOver();
        if (gameOver) {
          alert(config.gameOver);
        }
      }
    }
  };

  const swipeLeft = (dummy: boolean = false): Grid | void => {
    let oldGrid = data;
    let newArray = cloneDeep(data);

    for (let i = 0; i < 4; i++) {
      let b = newArray[i];
      let slow = 0;
      let fast = 1;
      while (slow < 4) {
        if (fast === 4) {
          fast = slow + 1;
          slow++;
          continue;
        }
        if (b[slow] === 0 && b[fast] === 0) {
          fast++;
        } else if (b[slow] === 0 && b[fast] !== 0) {
          b[slow] = b[fast];
          b[fast] = 0;
          fast++;
        } else if (b[slow] !== 0 && b[fast] === 0) {
          fast++;
        } else if (b[slow] !== 0 && b[fast] !== 0) {
          if (b[slow] === b[fast]) {
            b[slow] = b[slow] + b[fast];
            b[fast] = 0;
            fast = slow + 1;
            slow++;
          } else {
            slow++;
            fast = slow + 1;
          }
        }
      }
    }
    if (JSON.stringify(oldGrid) !== JSON.stringify(newArray)) {
      addNumber(newArray);
    }
    if (dummy) {
      return newArray;
    } else {
      setData(newArray);
    }
  };

  const swipeRight = (dummy: boolean = false): Grid | void => {
    let oldData = data;
    let newArray = cloneDeep(data);

    for (let i = 3; i >= 0; i--) {
      let b = newArray[i];
      let slow = b.length - 1;
      let fast = slow - 1;
      while (slow > 0) {
        if (fast === -1) {
          fast = slow - 1;
          slow--;
          continue;
        }
        if (b[slow] === 0 && b[fast] === 0) {
          fast--;
        } else if (b[slow] === 0 && b[fast] !== 0) {
          b[slow] = b[fast];
          b[fast] = 0;
          fast--;
        } else if (b[slow] !== 0 && b[fast] === 0) {
          fast--;
        } else if (b[slow] !== 0 && b[fast] !== 0) {
          if (b[slow] === b[fast]) {
            b[slow] = b[slow] + b[fast];
            b[fast] = 0;
            fast = slow - 1;
            slow--;
          } else {
            slow--;
            fast = slow - 1;
          }
        }
      }
    }
    if (JSON.stringify(newArray) !== JSON.stringify(oldData)) {
      addNumber(newArray);
    }
    if (dummy) {
      return newArray;
    } else {
      setData(newArray);
    }
  };

  const swipeDown = (dummy: boolean = false): Grid | void => {
    let b = cloneDeep(data);
    let oldData = cloneDeep(data);
    for (let i = 3; i >= 0; i--) {
      let slow = b.length - 1;
      let fast = slow - 1;
      while (slow > 0) {
        if (fast === -1) {
          fast = slow - 1;
          slow--;
          continue;
        }
        if (b[slow][i] === 0 && b[fast][i] === 0) {
          fast--;
        } else if (b[slow][i] === 0 && b[fast][i] !== 0) {
          b[slow][i] = b[fast][i];
          b[fast][i] = 0;
          fast--;
        } else if (b[slow][i] !== 0 && b[fast][i] === 0) {
          fast--;
        } else if (b[slow][i] !== 0 && b[fast][i] !== 0) {
          if (b[slow][i] === b[fast][i]) {
            b[slow][i] = b[slow][i] + b[fast][i];
            b[fast][i] = 0;
            fast = slow - 1;
            slow--;
          } else {
            slow--;
            fast = slow - 1;
          }
        }
      }
    }
    if (JSON.stringify(b) !== JSON.stringify(oldData)) {
      addNumber(b);
    }
    if (dummy) {
      return b;
    } else {
      setData(b);
    }
  };

  const swipeUp = (dummy: boolean = false): Grid | void => {
    let b = cloneDeep(data);
    let oldData = cloneDeep(data);
    for (let i = 0; i < 4; i++) {
      let slow = 0;
      let fast = 1;
      while (slow < 4) {
        if (fast === 4) {
          fast = slow + 1;
          slow++;
          continue;
        }
        if (b[slow][i] === 0 && b[fast][i] === 0) {
          fast++;
        } else if (b[slow][i] === 0 && b[fast][i] !== 0) {
          b[slow][i] = b[fast][i];
          b[fast][i] = 0;
          fast++;
        } else if (b[slow][i] !== 0 && b[fast][i] === 0) {
          fast++;
        } else if (b[slow][i] !== 0 && b[fast][i] !== 0) {
          if (b[slow][i] === b[fast][i]) {
            b[slow][i] = b[slow][i] + b[fast][i];
            b[fast][i] = 0;
            fast = slow + 1;
            slow++;
          } else {
            slow++;
            fast = slow + 1;
          }
        }
      }
    }
    if (JSON.stringify(oldData) !== JSON.stringify(b)) {
      addNumber(b);
    }
    if (dummy) {
      return b;
    } else {
      setData(b);
    }
  };

  const checkIfGameOver = (): boolean => {
    let checker = swipeLeft(true);

    if (JSON.stringify(data) !== JSON.stringify(checker)) {
      return false;
    }

    let checker2 = swipeDown(true);
    if (JSON.stringify(data) !== JSON.stringify(checker2)) {
      return false;
    }

    let checker3 = swipeRight(true);
    if (JSON.stringify(data) !== JSON.stringify(checker3)) {
      return false;
    }

    let checker4 = swipeUp(true);
    if (JSON.stringify(data) !== JSON.stringify(checker4)) {
      return false;
    }

    return true;
  };

  const resetGame = (): void => {
    setGameOver(false);
    addNumber(INITIAL_DATA);
    addNumber(INITIAL_DATA);
    setData(INITIAL_DATA);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>): void => {
    if (gameOver) {
      return;
    }
    switch (event.key) {
      case ARROW.UP:
        swipeUp();
        break;
      case ARROW.DOWN:
        swipeDown();
        break;
      case ARROW.LEFT:
        swipeLeft();
        break;
      case ARROW.RIGHT:
        swipeRight();
        break;
      default:
        break;
    }

    if (checkIfGameOver()) {
      setGameOver(true);
    }
  };

  useEffect(() => {
    initialize();
  }, []);

  useEvent("keydown", handleKeyDown);

  return (
    <div className="w-full">
      <div className="w-4/6 mx-auto mt-8">
        <div className="w-full flex flex-row gap-16 justify-center">
          <div className="text-6xl font-bold">2048</div>
          <div className="my-auto">
            <div
              onClick={resetGame}
              className="p-2.5 bg-brown-200 text-brown-50 w-28 rounded-md font-bold mx-auto cursor-pointer"
            >
              {config.newGame}
            </div>
          </div>
        </div>
        <div className="relative w-max h-max bg-brown-200 m-auto p-2 rounded-md mt-4">
          {gameOver && (
            <div className="absolute w-full h-full left-0 top-0 rounded-md bg-[rgba(238,228,218,0.5)] flex justify-center items-center">
              <div>
                <div className="text-3xl font-bold text-grey-700">
                  {config.gameOver}
                </div>
                <div>
                  <div className="flex-1 mt-auto">
                    <div
                      onClick={resetGame}
                      className="p-2.5 bg-brown-200 text-brown-50 w-20 rounded-lg font-bold cursor-pointer m-auto mt-5"
                    >
                      Try Again
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <Swipe
            onSwipeDown={() => swipeDown()}
            onSwipeLeft={() => swipeLeft()}
            onSwipeRight={() => swipeRight()}
            onSwipeUp={() => swipeUp()}
            className="overflow-y-hidden"
          >
            {data.map((row, oneIndex) => {
              return (
                <div className="flex" key={oneIndex}>
                  {row.map((digit, index) => (
                    <Block num={digit} key={index} />
                  ))}
                </div>
              );
            })}
          </Swipe>
        </div>

        <p className="mt-8 w-full text-center">
          <strong>How to play:</strong> Use your <strong>arrow keys</strong> to
          move the tiles. When two tiles with the same number touch, they{" "}
          <strong>merge into one!</strong>
        </p>
      </div>
    </div>
  );
}

export default Game2048;
