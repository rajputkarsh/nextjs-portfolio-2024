import React from 'react'
import "../elements/CSS/exit.css"
function ExitButton({clickExit}) {
    return (
        <div className="Exit">
            <a onClick={clickExit}>
                <span className="Left">
                    <span className="CircleLeft"></span>
                    <span className="CircleRight"></span>
                </span>
                <span className="Right">
                    <span className="CircleLeft"></span>
                    <span className="CircleRight"></span>
                </span>
            </a>
        </div>
    )
}

export default ExitButton
