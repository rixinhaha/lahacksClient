import "./Message.css";
import React from 'react';

const Message = (props) =>{
    let isSentByUser = false;
    const trimmedName = props.message.user.trim().toLowerCase();
    if(props.userid === trimmedName)
    {
        isSentByUser=true;
    }

    return(
        isSentByUser?(
            <div className="messageContainer justifyEnd">
                <p className="sentText pr-10">
                    {trimmedName}
                </p>
                <div className="messageBox backgroundBlue">
                    <p className="messageText colorDark">{props.message.text}</p>
                </div>
            </div>
        ):(
            <div className="messageContainer justifyStart">
                <div className="messageBox backgroundLight">
                    <p className="messageText colorDark">{props.message.text}</p>
                </div>
                <p className="sentText pl-10">
                    {trimmedName}
                </p>
            </div>
        )
    )
}

export default Message;