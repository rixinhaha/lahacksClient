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
    let URL = `http://localhost:5000/rooms/room1/messages/?num=5`;
    let data = [];
    axios.get(URL)
    .then((response)=>{
        data = response.data;
    })
    console.log(data)
}
