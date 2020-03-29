import React from 'react';
import './Input.css';
import { IoIosSend } from "react-icons/io"


const Input = (props) => {
    return(
        <form className="form">
            <input 
                className="input" 
                type="text"
                placeholder="Your message..."  
                value={props.message} 
                onChange={(e)=>props.setMessage(e.target.value)} 
                onKeyPress={(event)=>event.key==='Enter'? props.sendMessage(event): null}
            />
            <button className="sendButton" onClick={(event)=>{
                props.sendMessage(event);
            }}><div className="sendIconwrapper"><IoIosSend className="sendIcon"/></div></button>
        </form>
    )
}

export default Input;