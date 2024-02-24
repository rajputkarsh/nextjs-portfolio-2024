import React from 'react'
import GreenDiv from './GreenDiv'
function GreenButton({ value, onClick,children}) {
    return (
        <GreenDiv><button onClick={onClick}>{children}</button></GreenDiv>
    )
}

export default GreenButton
