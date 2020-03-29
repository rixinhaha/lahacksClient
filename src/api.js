import axios from 'axios';

let ENDPOINT='localhost:5000'

export const getOldmessages = (roomname,num,id) =>
{
    let URL = `${ENDPOINT}/rooms/${roomname}/messages/?num=${num}&start_id=${id}`;
    
    return axios.get(URL)
    .then((response)=>{
        return ({
            oldMessages: response.data,
            status: response.status,
        })
    })
}

export const getOldmessages_firstload = (roomname,num) =>
{
    console.log('here');
    let URL = `https://youtube-chatroom2.appspot.com/rooms/room1/messages/?num=5`;
    let data = [];
    fetch(URL)
    .then((response)=>{
        console.log(response)
    })
    return data;
    
}
