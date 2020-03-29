import "./Message.css";
import React from 'react';
import { GiBearFace } from "react-icons/gi";

const Message = (props) =>{
    let isSentByUser = false;
    const trimmedName = props.message.user.trim().toLowerCase();
    if(props.name === trimmedName)
    {
        isSentByUser=true;
    }

    if(isSentByUser===true)
    {
        return(
            <div className="messageContainer justifyEnd">
                {/* <p className="sentText pr-10">
                    {trimmedName}
                </p> */}
                <div className="messageBox backgroundBlue">
                    <p className="messageText colorDark">{props.message.text}</p>
                </div>
            </div>
        )
    }
    else if (props.message.user==='admin')
    {
        return(
            <div className="messageContainer justifyStart">
                <div className="messageBox backgroundLight">
                    <p className="messageText colorDark">{props.message.text}</p>
                </div>
                <div className="pl-10">
                    <div className="avatar-wrapper">
                        <GiBearFace className="avatar-icon"/>
                    </div>
                    <p className="sentText">
                        {trimmedName}
                    </p>
                    
                </div>
            </div>)
    }
    else{
        return(
            <div className="messageContainer justifyStart">
                <div className="messageBox backgroundLight">
                    <p className="messageText colorDark">{props.message.text}</p>
                </div>
                <div className="pl-10">
                    <div className="avatar-wrapper">
                        <img className="message-avatar" src={props.message.avatar}/>
                    </div>
                    <p className="sentText">
                        {trimmedName}
                    </p>
                    
                </div>
            </div>
        )
    }
}

export default Message;