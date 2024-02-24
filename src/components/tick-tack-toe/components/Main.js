import React,{useState,useEffect} from 'react'
import Board from './Board'
import Mode from '../components/Mode'
import SelectPlayer from './SelectPlayer';
import {checkWinner,AImove} from '../helper'
function Main() {
    const [square, setSquare] = useState(Array(9).fill(null));
    const [mode, setMode] = useState(null)
    const [Turn, setTurn] = useState(null)
    const [AI, setAI] = useState(null)
    const [ScoreX, setScoreX] = useState(0)
    const [ScoreO, setScoreO] = useState(0)
    const [Winner, setWinner] = useState(null)
    const [WinningSquares, setWinningSquares] = useState(null)
    const [ShowSquares, setShowSquares] = useState(true)

    useEffect(() => {
        if (mode && AI == Turn) {
            console.log(AImove(square, AI, AI == 'X' ? 'O' : 'X'));
            handleClick(AImove(square, AI, AI == 'X' ? 'O' : 'X'))
        }
        const winner = checkWinner(square)
        setWinner(winner?winner[0]:winner)
        setWinningSquares(winner ? winner[1] : winner)
        
    }, [square]);

    const countDown = (winner) => {
        setTimeout(() => {
            changeTurn()
            setShowSquares(false)
            setWinner(null)
        }, 2000);
    }

    useEffect(() => {
        if(Winner==='X')
        {
            setScoreX(ScoreX=>ScoreX+1)
        }
        else
        if(Winner==='O')
        {
            setScoreO(ScoreO =>ScoreO+1)
        }
        Winner!==null && countDown()
    }, [Winner])

    let changeTurn=()=>{
        if(Turn==='X')
            setTurn('O')
        else
        if(Turn==='O')
            setTurn('X')
    }

    const handleClick=(i)=>{
        const squares = square.slice()
        if (squares[i] || Winner) {
            return;
        }
        squares[i] = Turn
        setSquare(squares) 
        changeTurn()
    }

    const clickHumanBtn=()=>{
        setMode(false)
    }

    const clickAIBtn = () => {
        setMode(true)
    }

    const oPlayerSelect = () => {
        setTurn('O')
        setAI('X')
    }

    const xPlayerSelect = () => {
        setTurn('X')
        setAI('O')
    }

    const playAgain=()=>{
        setSquare(Array(9).fill(null));
        setShowSquares(true)
    }

    const clickExit=()=>{
        setScoreO(0);
        setScoreX(0);
        setShowSquares(true);
        setWinner(null);
        setSquare(Array(9).fill(null));
        setTurn(null);
        setMode(null);
    }
    
    return (
        <div>
            {
                mode===null?<Mode clickHumanBtn={clickHumanBtn} clickAIBtn={clickAIBtn} />
                    : Turn ? <Board clickExit={clickExit} playAgain={playAgain} ShowSquares={ShowSquares} mode={mode} Winner={Winner} Turn={Turn} AI={AI} squares={square} onClick={handleClick} xScore={ScoreX} oScore={ScoreO} WinningSquares={WinningSquares}/>
                    : <SelectPlayer oClick={oPlayerSelect} xClick={xPlayerSelect}/>
            }
        </div>
    )
}

export default Main
