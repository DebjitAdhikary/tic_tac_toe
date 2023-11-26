import { useCallback, useState } from "react";
import Card from "../Card/Card";
import { ToastContainer,toast} from 'react-toastify';
import isWinner from "../../helpers/checkWinner";

import './Grid.css';
import 'react-toastify/dist/ReactToastify.css'




// function isWinner(board,symbol){
//     //row wise
//     if(board[0]==board[1] && board[1]==board[2] && board[2]==symbol) return symbol;
//     if(board[3]==board[4] && board[4]==board[5] && board[5]==symbol) return symbol;
//     if(board[6]==board[7] && board[7]==board[8] && board[8]==symbol) return symbol;
//     //column wise
//     if(board[0]==board[3] && board[3]==board[6] && board[6]==symbol) return symbol;
//     if(board[1]==board[4] && board[4]==board[7] && board[7]==symbol) return symbol;
//     if(board[2]==board[5] && board[5]==board[8] && board[8]==symbol) return symbol;
//     //diagonal
//     if(board[0]==board[4] && board[4]==board[8] && board[8]==symbol) return symbol;
//     if(board[2]==board[4] && board[4]==board[6] && board[6]==symbol) return symbol;

//     return null;
// }

function Grid({numberOfCards}){
    const [turn,setTurn]= useState(true); // false => x , true => O

    const [board, setBoard]= useState(Array(numberOfCards).fill("")) // array of size 9 

    const [winner,setWinner]=useState(null)

    const [count,setCount]=useState(0)

    const play=useCallback( function playCallback(index){
        //if(board[index]=="" ){ //it handels no change to clicked card  ,now it is in card.jsx  as player==""
            // console.log('move played',index);
            if(turn == true){
                board[index] ="O"
            }else{
                board[index]="X"
            }
            const win = isWinner(board, turn ? "O":"X")
            if(win){
                setWinner(win)
                toast.success(`Congratulation ${win} won the game !!`)
            }

            setBoard([...board])  // passing new array to setBoard to update board
            setTurn(!turn)
            setCount(count+1)

           
        //}
    },[turn]); 

    function reset(){
        setBoard(Array(numberOfCards).fill(""))
        setWinner(null)
        setTurn(true)
        setCount(0)
    }

    if(count ==9 && winner==null){
        toast.success("Draw, Play again")
    }

    return (
       <div className="grid-wrapper"> 
            {/* conditional rendering of winner */}
            {winner && (
                <>
                    <h1 className="turn-highlight">Winner is : {winner}</h1>
                    <button className="reset" onClick={reset}>Reset Game</button>
                    <ToastContainer position="top-center"/>
                </>
                
                )
            }
            {/* match draw condition rendering*/}
            {
            count ==9 && winner == null &&
                (
                    <>
                        <h1 className="turn-highlight">Match Draw !! </h1>
                        <button className="reset" onClick={reset}>Reset Game</button>
                        <ToastContainer position="top-center"/>
                    </>
                )
            
            }

            <h1 className="turn-highlight">Current turn : {(turn)? 'O' : 'X'} </h1>
            <div className="grid">
            {board.map((value,idx)=>{
                return <Card gameEnd={winner ? true:false} onPlay={play} player={value} key={idx} index={idx} /> // custom prop onPlay passing function play() to child card
            })}
            </div>
        
        </div>
    )
}

export default Grid;