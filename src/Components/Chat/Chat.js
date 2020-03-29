import React, {useState, useEffect} from 'react';
import io from "socket.io-client";
import './Chat.css';
import InfoBar from "../InfoBar/InfoBar";
import Input from "../Input/Input";
import Messages from "../Messages/Messages";
import Users from "../Users/Users";
import {getOldmessages, getOldmessages_firstload} from '../../api';

let socket;

const Chat = (props) => {
    const [name, setId] = useState(props.name);
    const [room, setRoom] = useState(props.room);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [avatar, setAvatar] = useState(props.avatar)
    const [counter, setCounter]=useState(0)
    const ENDPOINT = 'localhost:5000';
    const [users, setUsers] = useState([]);
    const [newmessage, setNewmessage] = useState(false);
    const [hasmore, setHasmore] = useState(true); 
    const [lastid, setLastid] = useState('');


    useEffect(()=>{
        socket=io(ENDPOINT);
        console.log(socket);
        //call the api function for first load
        loadOldmessages_firstload();
        socket.emit('join', {name, room}, (error)=>{
            if(error)
            {
                alert(error);
            }
        })
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
            socket.emit('sendMessage', {text: message, name: name, room: room, avatar: avatar}, ()=>setMessage(''))
        }

    }

    let loadOldmessages_firstload = () => {
        let oldmessagesresponse = getOldmessages_firstload(room, 10)
        console.log(oldmessagesresponse);
        let oldmessages = []
        if(oldmessagesresponse.length===0)
        {
            setHasmore(false);
            return
        }
        else if(oldmessagesresponse.length===1)
        {
            oldmessages.push({
                user: oldmessagesresponse[0].author.name,
                text: oldmessagesresponse[0].content,
                avatar: oldmessagesresponse[0].author.avatar,
            })
            setHasmore(false);
            return;
        }
        oldmessagesresponse.forEach((element, index) => {
            if (index===0)
            {
                setLastid(element._id)
            }
            else 
            {
                oldmessages.push({
                    user: element.author.name,
                    text: element.content,
                    avatar: element.author.avatar,
                })
            }
        });
        setMessages([...oldmessages, ...messages]);
        setNewmessage(false);
        console.log(messages)
    }

    let loadOldmessages = () => {
        let oldmessages = []
        if(hasmore===true)
        {
            let oldmessagesresponse = getOldmessages(room, 5, lastid).oldMessages
            if(oldmessagesresponse.length===0)
            {
                setHasmore(false);
                return
            }
            else if(oldmessagesresponse.length===1)
            {
                oldmessages.push({
                    user: oldmessagesresponse[0].author,
                    text: oldmessagesresponse[0].content,
                    avatar: oldmessagesresponse[0].avatar,
                })
                setHasmore(false);
                return;
            }
            oldmessagesresponse.forEach((element, index) => {
                if (index===0)
                {
                    setLastid(element._id)
                }
                else 
                {
                    oldmessages.push({
                        user: element.author,
                        text: element.content,
                        avatar: element.avatar,
                    })
                }
            });
        }
        else{return;}
        setMessages([...oldmessages, ...messages]);
        setNewmessage(false);
        console.log(messages)
    }


    return (
        <div className="outerContainer">
            <div className="container">
                <InfoBar room={room}/>
                <Messages messages={messages} name={name}  loadOldmessages={loadOldmessages} newmessage={newmessage} avatar={avatar}/>
                <Input message={message} sendMessage={sendMessage} setMessage={setMessage}/>
            </div>
        </div>
    )
}

export default Chat