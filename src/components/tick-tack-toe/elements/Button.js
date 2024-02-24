import styled, { keyframes } from "styled-components"

const animation = keyframes`
    0% { background-position: 0 0; }
    50% { background-position: 400% 0; }
    100% { background-position: 0 0; }
`
const Button = styled.button `
    @import url('https://fonts.googleapis.com/css2?family=Coda+Caption:wght@800&family=Luckiest+Guy&display=swap');
    width: ${props=>props.width?props.width:'auto'};
    height: ${props => props.height ? props.height : '100px'};
    margin: 0.5%;
    border: none;
    outline: none;
    color: ${props => props.color ? props.color:"#fff"};
    background: ${props => props.backgroundColor ? props.backgroundColor : "#111"};
    cursor: pointer;
    position: relative;
    z-index: 0;
    border-radius: 10px;
    font-size: 50px;
    font-family: 'Coda Caption', sans-serif;
    font-family: 'Luckiest Guy', cursive;

    &:before{
        content: '';
        background: linear-gradient(45deg, #ff0000, #ff7300, #fffb00, #48ff00, #00ffd5, #002bff, #7a00ff, #ff00c8, #ff0000);
        position: absolute;
        top: -2px;
        left:-2px;
        background-size: 400%;
        z-index: -1;
        filter: blur(5px);
        width: calc(100% + 4px);
        height: calc(100% + 4px);
        animation: ${animation} 20s linear infinite;
        opacity: 0;
        transition: opacity .3s ease-in-out;
        border-radius: 10px;
    }

    &:after{
        z-index: -1;
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        background: #111;
        left: 0;
        top: 0;
        border-radius: 10px;
    }

    &:hover:before {
        opacity: 1;
    }

    &:active:after {
        background: transparent;
    }

    &:active {
        color: #000
    }  
`
export default Button;