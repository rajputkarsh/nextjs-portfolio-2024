import React from "react";

import "./index.module.scss";

function Hearts() {
  return (
    <>
      <div id="main-button-group">
        <button className="main-button newgame-but">New Game</button>
        <button className="main-button" id="settings-but">
          Settings
        </button>
      </div>
      <div id="game-region"></div>
      <div id="control-region" hidden>
        <div id="settings-dialog" hidden>
          <h3>Settings</h3>
          <table>
            <tbody>
              <tr>
                <th>Player</th>
                <th>Name</th>
                <th>Level</th>
              </tr>
              <tr>
                <td className="tabledata">Player 1(you):</td>
                <td
                  className="tabledata player-set-name one"
                  contentEditable
                ></td>
              </tr>
              <tr>
                <td className="tabledata">Player 2(East):</td>
                <td
                  className="tabledata player-set-name two"
                  contentEditable
                ></td>
                <td className="tabledata player-diff two">
                  <input className="inputfield" type="number" min="1" max="4" />
                </td>
              </tr>
              <tr>
                <td className="tabledata">Player 3(North):</td>
                <td
                  className="tabledata player-set-name three"
                  contentEditable
                ></td>
                <td className="tabledata player-diff three">
                  <input className="inputfield" type="number" min="1" max="4" />
                </td>
              </tr>
              <tr>
                <td className="tabledata">Player 4(West):</td>
                <td
                  className="tabledata player-set-name four"
                  contentEditable
                ></td>
                <td className="tabledata player-diff four">
                  <input className="inputfield" type="number" min="1" max="4" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <button className="back-but">Back</button>
        <button className="newgame-but">Apply</button>
      </div>
    </>
  );
}

export default Hearts;
