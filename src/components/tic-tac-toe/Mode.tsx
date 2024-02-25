import config from "@/constants/config";

interface ModeProps {
  clickAIBtn: () => void;
  clickHumanBtn: () => void;
}

function Mode({ clickHumanBtn, clickAIBtn }: ModeProps) {
  return (
    <div className="flex flex-col items-center justify-center p-5 rounded-md border-2">
      <h1>{config.playTicTacToe}</h1>
      <div className={`flex flex-col items-center justify-center`}>
        <h2>{config.selectMode}</h2>
        <button onClick={clickHumanBtn}>{config.twoPlayer}</button>
        <button onClick={clickAIBtn}>{config.onePlayer}</button>
      </div>
    </div>
  );
}

export default Mode;
