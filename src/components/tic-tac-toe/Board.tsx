import ScoreCard from "./ScoreCard";

interface BoardProps {
  squares: Array<"X" | "O" | null>;
  onClick: (i: number) => void;
  Turn: "X" | "O";
  xScore: number;
  oScore: number;
  Winner: null | string;
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
        className={`text-[${color}] border-slate-500 border-2 rounded-xl w-16 h-16`}
        onClick={() => {
          onClick(i);
        }}
      >
        {!squares[i] ? "" : squares[i]}
      </button>
    );
  };

  return (
    <div>
      <h1 className="w-full text-center text-3xl">
        {Winner === "d" ? "Draw" : Winner !== null && "Winner: " + Winner}
      </h1>
      {Winner === null && (
        <ScoreCard Turn={Turn} xScore={xScore} oScore={oScore} />
      )}
      {ShowSquares && (
        <div className="flex flex-col items-center justify-center gap-2 mt-8">
          <div className="flex flex-row items-center justify-center gap-2">
            {renderSquare(0)}
            {renderSquare(1)}
            {renderSquare(2)}
          </div>

          <div className="flex flex-row items-center justify-center gap-2">
            {renderSquare(3)}
            {renderSquare(4)}
            {renderSquare(5)}
          </div>

          <div className="flex flex-row items-center justify-center gap-2">
            {renderSquare(6)}
            {renderSquare(7)}
            {renderSquare(8)}
          </div>
        </div>
      )}
      {!ShowSquares && (
        <div className="w-full flex flex-row justify-center items-center mt-16">
          <button
            className="text-xl md:text-2xl border-slate-500 border-2 rounded-xl px-4 md:px-8 py-2 md:py-4"
            onClick={playAgain}
          >
            Play Again
          </button>
        </div>
      )}
    </div>
  );
}

export default Board;
