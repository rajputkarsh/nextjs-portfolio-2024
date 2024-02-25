interface ScoreCardProps {
  xScore: number;
  oScore: number;
  Turn: "X" | "O";
}

function ScoreCard({ Turn, xScore, oScore }: ScoreCardProps) {
  const XTurnColor = Turn === "X" ? "#39ff14" : "";
  const OTurnColor = Turn === "O" ? "#39ff14" : "";

  return (
    <div className="w-full flex flex-row justify-center">
      <h1 className="flex flex-row gap-8 text-lg">
        <p className="font-semibold">Player X - {xScore}</p>
        <p className="font-semibold">Player O - {oScore}</p>
      </h1>
    </div>
  );
}

export default ScoreCard;
