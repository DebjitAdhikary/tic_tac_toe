import Icon from "../Icon/Icon";
import './Card.css'
import {memo} from 'react'

function Card({onPlay,player,index,gameEnd}){

    let icon =<Icon />
    if(player =='X'){
        icon=<Icon name={"cross"}/>
    }else if(player =='O'){
        icon=<Icon name={"circle"}/>
    }

    // if the game is not end and card is not clicked before then call onplay -> onClick over card
    return (
        <div className="card" onClick={()=> !gameEnd && player=="" && onPlay(index)} >
           {icon}
        </div>
    )
}

export default memo(Card); // card will not re-rendered if not clicked