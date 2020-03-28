import React, {useState, useEffect} from 'react';
import io from "socket.io-client";
import './Chat.css';
import InfoBar from "../InfoBar/InfoBar";
import Input from "../Input/Input";
import Messages from "../Messages/Messages";
import Users from "../Users/Users";

let socket;

const Chat = (props) => {
    const [name, setId] = useState(props.name);
    const [room, setRoom] = useState(props.room);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([
        {
            user: "tony",
            text: "something is wrong",
        },
        {
            user: "jackie",
            text: "weird stuff",
        },
        {
            user: "tony",
            text: "something is wrong",
        },
        {
            user: "jackie",
            text: "weird stuff",
        },
        {
            user: "tony",
            text: "something is wrong",
        },
        {
            user: "jackie",
            text: "weird stuff",
        },
        {
            user: "tony",
            text: "something is wrong",
        },
        {
            user: "jackie",
            text: "weird stuff",
        },
        {
            user: "tony",
            text: "something is wrong",
        },
        {
            user: "jackie",
            text: "weird stuff",
        },
        {
            user: "tony",
            text: "something is wrong",
        },
        {
            user: "jackie",
            text: "weird stuff",
        }
    ]);
    const [oldmessages, setOldmessages] = useState([
        {
            user: "fked up",
            text: "trwanf",
        },
        {
            user: "jackdjhwjie",
            text: "weircekwnvlewd stuff",
        }
    ]);
    const [counter, setCounter]=useState(0)
    const ENDPOINT = 'localhost:5000';
    const [leavechat, setLeave] = useState(false);
    const [users, setUsers] = useState([]);
    const [newmessage, setNewmessage] = useState(false);


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
        socket.emit('join', {name, room}, ()=>{

        })
        return ()=>{
            if(socket.connected===true)
            {
                socket.emit('disconnect');
                socket.close();
            }
        }
    }, [ENDPOINT, name, room])

    useEffect(()=>{
        socket.on('message', (message)=>{
            setMessages([...messages,message])
            setNewmessage(true);
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
            socket.emit('sendMessage', {text: message, name: name, room: room}, ()=>setMessage(''))
        }

    }

    let loadOldmessages = () => {
        setMessages([...oldmessages, ...messages]);
        setCounter(counter+1);
        setNewmessage(false);
        console.log(messages)
    }


    return (
        <div className="outerContainer">
            <div className="container">
                <InfoBar room={room} leaveChat={leaveChat}/>
                <Messages messages={messages} name={name} oldmessages={oldmessages}  loadOldmessages={loadOldmessages} newmessage={newmessage}/>
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