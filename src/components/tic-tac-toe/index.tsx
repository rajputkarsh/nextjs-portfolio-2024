import { useState, useEffect } from 'react';

import Board from './Board';
import Mode from './Mode';
import SelectPlayer from './SelectPlayer';
import { checkWinner, AImove } from './helper';

function TicTacToe() {
  const [square, setSquare] = useState<Array<'X' | 'O' | null>>(
    Array(9).fill(null)
  );
  const [mode, setMode] = useState<boolean | null>(false);
  const [Turn, setTurn] = useState<'X' | 'O' | null>(null);
  const [AI, setAI] = useState<'X' | 'O' | null>(null);
  const [ScoreX, setScoreX] = useState<number>(0);
  const [ScoreO, setScoreO] = useState<number>(0);
  const [Winner, setWinner] = useState<'X' | 'O' | 'DRAW' | null>(null);
  const [WinningSquares, setWinningSquares] = useState<Array<number | null>>(
    []
  );
  const [ShowSquares, setShowSquares] = useState<boolean>(true);

  useEffect(() => {
    if (mode && AI && AI === Turn) {
      const AIMove = AImove(square, AI, AI === 'X' ? 'O' : 'X');
      handleClick(AIMove);
    }
    const winner = checkWinner(square);
    if (winner && winner !== 'draw') {
      setWinner(winner.player);
      setWinningSquares(winner.win);
    }

    if (winner === 'draw') {
      setWinner('DRAW');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [square]);

  const countDown = () => {
    setTimeout(() => {
      changeTurn();
      setShowSquares(false);
      setWinner(null);
    }, 3000);
  };

  useEffect(() => {
    if (Winner === 'X') {
      setScoreX((ScoreX) => ScoreX + 1);
    } else if (Winner === 'O') {
      setScoreO((ScoreO) => ScoreO + 1);
    }
    Winner !== null && countDown();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Winner]);

  let changeTurn = () => {
    if (Turn === 'X') setTurn('O');
    else if (Turn === 'O') setTurn('X');
  };

  const handleClick = (i: number | undefined) => {
    if (i === undefined || Turn === undefined) return;

    const squares = square.slice();
    if (squares[i] || Winner) {
      return;
    }
    squares[i] = Turn;
    setSquare(squares);
    changeTurn();
  };

  const clickHumanBtn = () => {
    setMode(false);
  };

  const clickAIBtn = () => {
    setMode(true);
  };

  const oPlayerSelect = () => {
    setTurn('O');
    setAI('X');
  };

  const xPlayerSelect = () => {
    setTurn('X');
    setAI('O');
  };

  const playAgain = () => {
    setSquare(Array(9).fill(null));
    setShowSquares(true);
  };

  return (
    <div className="tic-tac-toe-container">
      {mode === null ? (
        <Mode clickHumanBtn={clickHumanBtn} clickAIBtn={clickAIBtn} />
      ) : Turn ? (
        <Board
          playAgain={playAgain}
          ShowSquares={ShowSquares}
          Winner={Winner}
          Turn={Turn}
          squares={square}
          onClick={handleClick}
          xScore={ScoreX}
          oScore={ScoreO}
          WinningSquares={WinningSquares}
        />
      ) : (
        <SelectPlayer
          oClick={oPlayerSelect}
          xClick={xPlayerSelect}
          mode={mode}
        />
      )}
    </div>
  );
}

export default TicTacToe;
