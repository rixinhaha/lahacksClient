import React from 'react';
import './InfoBar.css';
import { MdHome } from "react-icons/md";

const InfoBar = (props) => {
    return(
        <div className="infoBar">
            <div className="leftInnerContainer">
                <div className="iconWrapper">
                    <MdHome className="roomIcon"/>
                </div>
                <h3>Room {props.room}</h3>
            </div>
        </div>
    )
}

export default InfoBar;