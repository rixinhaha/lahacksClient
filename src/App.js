import React, {useState, useEffect} from 'react';
import './App.css';
import NewWindow from 'react-new-window';
import Chat from './Components/Chat/Chat';

function App() {
  const [popout, setPopout] = useState(false);
  const [userleave, setLeave] = useState(false);
  const [userid, setUser] = useState("");
  const [room, setRoom] = useState("");
  let torender = (
    <h1>
      <label>
        User ID:
        <input type="text" name="userid" 
          onChange={(e)=>{
            setUser(e.target.value)
            console.log(userid)
          }}
        />
      </label>
      <label>
        Room:
        <input type="text" name="userid" 
          onChange={(e)=>{
            setRoom(e.target.value)
            console.log(userid)
          }}
        />
      </label>
      <button onClick={()=>{
        setPopout(true)
      }}>Join Room</button>
    </h1>
  )
  if(popout===true)
  {
    torender = (
      <div>
        <NewWindow title='Chatroom'  onUnload={()=>{
            setPopout(false)
        }}>
          <Chat userid={userid} room={room} setLeave={setLeave} setPopout={setPopout}/>
        </NewWindow>
      </div>
    )
  }

  return (
    <div className="App">
      {torender}
    </div>
  );
}

export default App;
