interface ScoreCardProps {
  xScore: number;
  oScore: number;
  Turn: "X" | "O";
}

function ScoreCard({ Turn, xScore, oScore }: ScoreCardProps) {
  const XTurnColor = Turn === "X" ? "#39ff14" : "";
  const OTurnColor = Turn === "O" ? "#39ff14" : "";

  return (
    <div className="score-card-container">
      <h1>Score: </h1>
      <button className="w-10 h-10 font-xl text-center mx-3 md:pt-2"> X</button>
      <span className={`text-center font-xl text-[${XTurnColor}] table m-auto`}>
        {" "}
        -{" "}
      </span>
      <span className={`text-center font-xl text-[${XTurnColor}]  mr-8`}>
        {xScore}
      </span>
      <button className="w-10 h-10 ml-8 font-xl text-center mx-3 md:pt-2">
        O
      </button>
      <span className={`text-center font-xl text-[${OTurnColor}] table m-auto`}>
        {" "}
        -{" "}
      </span>
      <span className={`text-center font-xl text-[${OTurnColor}]  mr-8`}>
        {xScore}
      </span>
    </div>
  );
}

export default ScoreCard;
