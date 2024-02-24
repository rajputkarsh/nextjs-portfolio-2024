import React from 'react'
import styled from 'styled-components'
import Button from '../elements/Button'

const Score = styled.span`
    @import url('https://fonts.googleapis.com/css2?family=Coda+Caption:wght@800&family=Luckiest+Guy&display=swap');
    font-size: 40px;
    font-family: 'Coda Caption', sans-serif;
    font-family: 'Luckiest Guy', cursive;
    text-align: center
`

function ScoreCard({Turn,xScore,oScore}) {

    const XTurnColor = Turn === 'X' ? "#39ff14" : '';
    const OTurnColor = Turn === 'O' ? "#39ff14" : '';

    return (
        <div className="score-card-container">
            <h1>Score: </h1>
            <Button className="score-button" width={'40px'} height={'40px'}> X</Button>
            {<Score style={{ color: XTurnColor, display: 'table', margin: 'auto' }}> - </Score>}
            <Score style={{color:XTurnColor}} className="margined-right" turn={Turn} check='X'>{xScore}</Score>
            <Button className="score-button margined-left" width={'40px'} height={'40px'}>O</Button>
            {<Score style={{ color: OTurnColor, display: 'table', margin: 'auto' }}> - </Score>}
            <Score style={{color:OTurnColor}} turn={Turn} check='O'>{oScore}</Score>
        </div>
    )
}

export default ScoreCard
