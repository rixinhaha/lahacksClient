import React from 'react';
import './InfoBar.css';
import { AiFillCloseCircle } from "react-icons/ai";
import { MdHome } from "react-icons/md";

const InfoBar = (props) => {
    return(
        <div className="infoBar">
            <div className="leftInnerContainer">
                <AiFillCloseCircle onClick={()=>{
                    props.leaveChat()
                }}/>
            </div>
            <div className="rightInnerContainer">
                <div className="iconWrapper">
                <MdHome className="roomIcon"/>
                </div>
                <h3>Room {props.room}</h3>
                
            </div>
            
        </div>
    )
}

export default InfoBar;