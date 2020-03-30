import React, {useState, useEffect} from 'react';
import io from "socket.io-client";
import './Chat.css';
import InfoBar from "../InfoBar/InfoBar";
import Input from "../Input/Input";
import Messages from "../Messages/Messages";
import axios from 'axios';

let socket;

const Chat = (props) => {
    const [name, setId] = useState(props.name);
    const [room, setRoom] = useState(props.room);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [avatar, setAvatar] = useState(props.avatar)
    const [counter, setCounter]=useState(0)
    const ENDPOINT = 'https://youtube-chatroom2.appspot.com/';
    const [users, setUsers] = useState([]);
    const [newmessage, setNewmessage] = useState('load');
    const [hasmore, setHasmore] = useState(true); 
    const [lastid, setLastid] = useState('');
    const [firstLoad, setFirstload] = useState(true)


    useEffect(()=>{
        socket=io.connect(ENDPOINT, {
            transports: ['websocket'],
            rejectUnauthorized: false
        });
        console.log(socket);
        socket.emit('join', {name, room}, (error)=>{
            if(error)//call the api function for first load
            {
                alert(error);
            }
        })
    }, [ENDPOINT, name, room])

    useEffect(()=>{
        socket.on('message', (message)=>{
            setMessages([...messages,message])
            console.log("NEEEEEEEEEEEEEEEEEEW")
            setNewmessage('new');
        })
    }, [messages]);

    useEffect(()=>{
        async function firstload(){
            let oldmessagesresponse = await axios.get(`https://youtube-chatroom2.appspot.com/rooms/${room}/messages?num=${20}`).then(response=>{return response.data})
            oldmessagesresponse = oldmessagesresponse.data
            oldmessagesresponse = oldmessagesresponse.reverse()
            console.log(oldmessagesresponse)
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
            setNewmessage('load');
            setMessages([...oldmessages, ...messages]);
        }
        if(firstLoad===true)
        {firstload(); setFirstload(true)}
    },[firstLoad])

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


    let loadOldmessages = async function fetcholdmessages() {
        let oldmessages = []
        if(hasmore===true)
        {
            let oldmessagesresponse = await axios.get(`https://youtube-chatroom2.appspot.com/rooms/${room}/messages?num=${5}&start_id=${lastid}`).then(response=>{return response.data})
            oldmessagesresponse = oldmessagesresponse.data
            oldmessagesresponse = oldmessagesresponse.reverse()
            console.log(oldmessagesresponse)
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
        }
        else{return;}
        setNewmessage('load');
        setMessages([...oldmessages, ...messages]);
        console.log(messages)
    }


    return (
        <div className="container">
            <InfoBar room={room}/>
            <Messages messages={messages} name={name}  loadOldmessages={loadOldmessages} newmessage={newmessage} avatar={avatar}/>
            <Input message={message} sendMessage={sendMessage} setMessage={setMessage}/>
        </div>
    )
}

export default Chat