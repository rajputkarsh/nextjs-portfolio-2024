import React from 'react'
import Button from '../elements/Button'
function SelectPlayer({ xClick, oClick, mode}) {
    return (
        <div className='select-player-container'>
            <h1 className="select-player-title">
                {
                    mode ? 
                        "Select Player"
                    :
                        "Select Character for Player 1"

                }
            </h1>
            <div>
                <Button width={'100px'} height={'100px'} onClick={xClick}>X</Button>
                <Button width={'100px'} height={'100px'} onClick={oClick}>O</Button>
            </div>
        </div>
    )
}

export default SelectPlayer
