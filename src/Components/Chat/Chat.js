import React, {useState, useEffect} from 'react';
import io from "socket.io-client";
import './Chat.css';
import InfoBar from "../InfoBar/InfoBar";
import Input from "../Input/Input";
import Messages from "../Messages/Messages";
import Users from "../Users/Users";

let socket;

const Chat = (props) => {
    const [userid, setId] = useState(props.userid);
    const [room, setRoom] = useState(props.room);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const ENDPOINT = 'localhost:5000';
    const [leavechat, setLeave] = useState(false)
    const [users, setUsers] = useState([]);

    let leaveChat = () => {
        setLeave(true);
        props.setPopout(false);
        // socket.emit('disconnect');
        // socket.off();
        if(socket.connected===true)
        {socket.close();}
    }

    useEffect(()=>{
        socket=io(ENDPOINT);
        console.log(socket);
        socket.emit('join', {userid, room}, ()=>{

        })
        return ()=>{
            if(socket.connected===true)
            {socket.close();}
        }
    }, [ENDPOINT, userid, room])

    useEffect(()=>{
        socket.on('message', (message)=>{
            setMessages([...messages,message])
        })
    }, [messages]);

    useEffect(()=>{
        socket.on('roomData', (roomdata)=>{
            console.log(roomdata.users);
            setUsers(roomdata.users);
        })
    },[messages])

    //function for sending messages
    const sendMessage = (event) => {
        event.preventDefault();
        if(message){
            socket.emit('sendMessage', message, ()=>setMessage(''))
        }
    }


    return (
        <div className="outerContainer">
            <div className="container">
                <InfoBar room={room} leaveChat={leaveChat}/>
                <Messages messages={messages} userid={userid}/>
                <Input message={message} sendMessage={sendMessage} setMessage={setMessage}/>
            </div>
            <div style={{
                width: 110,
            }}>
                <Users users={users}/>
            </div>
        </div>
    )
}

export default Chat