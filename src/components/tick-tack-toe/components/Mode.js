import React from "react";
import GreenButton from "../elements/GreenButton";

function Mode({ clickHumanBtn, clickAIBtn }) {
  return (
    <div className="select-mode">
      <h1>Play Tik Tak Toe</h1>
      <div className={`bordered-select ${theme.name}`}>
        <h2>Select mode</h2>
        <GreenButton onClick={clickHumanBtn}>Two Player</GreenButton>
        <GreenButton onClick={clickAIBtn}>One Player</GreenButton>
      </div>
    </div>
  );
}

export default Mode;
