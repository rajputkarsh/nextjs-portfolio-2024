import styled from "styled-components"

const GreenDiv = styled.div`
    height: 100%;
    margin-top: 1%;

    button{
        margin-bottom: 50px;
        @media (max-width: 768px) {
            min-width: 150px;
            min-height: 30px;
        }
        min-width: 300px;
        min-height: 60px;
        font-family: 'Nunito', sans-serif;
        font-size: 22px;
        text-transform: uppercase;
        letter-spacing: 1.3px;
        font-weight: 700;
        color: #000;
        background: #39ff14;
        background: linear-gradient(90deg, rgb(129, 230, 129) 0%, rgb(142, 209, 79) 100%);
        border: none;
        border-radius: 1000px;
        box-shadow: 12px 12px 24px rgba(113, 235, 37, 0.64);
        transition: all 0.3s ease-in-out 0s;
        cursor: pointer;
        outline: none;
        position: relative;
        padding: 10px;
    }
    button:before{
        content: '';
        border-radius: 1000px;
        @media (max-width: 768px) {
            min-width: calc(150px + 15px);
            min-height: calc(30px + 25px);
        }
        
        min-width: calc(300px + 12px);
        min-height: calc(60px + 12px);
        border: 6px solid #39ff14;
        box-shadow: 0 0 60px rgba(129, 255, 64, 0.64);
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        opacity: 0;
        transition: all .3s ease-in-out 0s;
    }

    button:hover, button:focus{
        color: whitesmoke;
        transform: translateY(-6px);
    }

    button:hover:before, button:focus:before{
        opacity: 1;
    }
    
    button:after{
        content: '';
        width: 30px; 
        height: 30px;
        border-radius: 100%;
        /* border: 6px solid #39ff14; */
        position: absolute;
        z-index: -1;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

`
export default GreenDiv;