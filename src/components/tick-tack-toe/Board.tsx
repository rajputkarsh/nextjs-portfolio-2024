import ScoreCard from "./ScoreCard";

interface BoardProps {
  squares: Array<number | null>;
  onClick: (i: number) => void;
  Turn: "X" | "O";
  xScore: number;
  oScore: number;
  Winner: string;
  WinningSquares: Array<number | null>;
  ShowSquares: boolean;
  playAgain: () => void;
}

function Board({
  squares,
  onClick,
  Turn,
  xScore,
  oScore,
  Winner,
  WinningSquares,
  ShowSquares,
  playAgain,
}: BoardProps) {
  const renderSquare = (i: number) => {
    const color =
      WinningSquares !== null && WinningSquares.indexOf(i) !== -1
        ? "#39ff14"
        : null;
    return (
      <button
        className={`text-${color} w-24 h-24`}
        onClick={() => {
          onClick(i);
        }}
      >
        {!squares[i] ? "." : squares[i]}
      </button>
    );
  };

  return (
    <div className="board-container">
      <h1>
        {Winner === "d" ? "Draw" : Winner !== null && "Winner: " + Winner}
      </h1>
      {Winner === null && (
        <ScoreCard Turn={Turn} xScore={xScore} oScore={oScore} />
      )}
      {ShowSquares && (
        <div>
          <div>
            {renderSquare(0)}
            {renderSquare(1)}
            {renderSquare(2)}
          </div>

          <div>
            {renderSquare(3)}
            {renderSquare(4)}
            {renderSquare(5)}
          </div>

          <div>
            {renderSquare(6)}
            {renderSquare(7)}
            {renderSquare(8)}
          </div>
        </div>
      )}
      {!ShowSquares && (
        <div>
          <button onClick={playAgain}>Play Again</button>
        </div>
      )}
    </div>
  );
}

export default Board;
