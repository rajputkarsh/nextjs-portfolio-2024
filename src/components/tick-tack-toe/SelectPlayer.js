import React from "react";
function SelectPlayer({ xClick, oClick, mode }) {
  return (
    <div className="select-player-container">
      <h1 className="select-player-title">
        {mode ? "Select Player" : "Select Character for Player 1"}
      </h1>
      <div>
        <button classname="w-24 h-24" onClick={xClick}>
          X
        </button>
        <button classname="w-24 h-24" onClick={oClick}>
          O
        </button>
      </div>
    </div>
  );
}

export default SelectPlayer;
