import React from 'react';
import './Input.css';

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
            }}>Send</button>
        </form>
    )
}

export default Input;