import {FaTimes,FaPen,FaRegCircle} from 'react-icons/fa'
import {memo} from 'react'
//memo stops re-rendering if no change in props // optimization

function Icon({name}){
    if(name == "circle"){
        return <FaRegCircle />
    }else if(name =="cross"){
        return <FaTimes />
    }else {
        return <FaPen />
    }
}

export default memo(Icon); //only changed icon will re-render