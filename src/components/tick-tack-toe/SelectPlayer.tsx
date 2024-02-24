interface SelectPlayerProps {
  xClick: () => void;
  oClick: () => void;
  mode: boolean;
}

function SelectPlayer({ xClick, oClick, mode }: SelectPlayerProps) {
  return (
    <div className="select-player-container">
      <h1 className="select-player-title">
        {mode ? "Select Player" : "Select Character for Player 1"}
      </h1>
      <div>
        <button className="w-24 h-24" onClick={xClick}>
          X
        </button>
        <button className="w-24 h-24" onClick={oClick}>
          O
        </button>
      </div>
    </div>
  );
}

export default SelectPlayer;
