import React, {useState, useEffect} from 'react';
import './App.css';
import Chat from './Components/Chat/Chat';
import Cookies from 'js-cookie';

function App() {
  const [popout, setPopout] = useState(false);
  const [name, setUser] = useState("");
  const [room, setRoom] = useState("");
  let torender = (
    <h1>
      <label>
        User ID:
        <input type="text" name="name" 
          onChange={(e)=>{
            setUser(e.target.value)
            console.log(name)
          }}
        />
      </label>
      <label>
        Room:
        <input type="text" name="room" 
          onChange={(e)=>{
            setRoom(e.target.value)
            console.log(name)
          }}
        />
      </label>
      <button onClick={()=>{
        setPopout(true)
        Cookies.set('name', name);
        Cookies.set('room', room);
        console.log(Cookies.get('name'))
        console.log(Cookies.get('room'))
      }}>Join Room</button>
    </h1>
  )
  if(popout===true)
  {
    torender = (
      <div>
        <Chat name={Cookies.get('name')} room={Cookies.get('room')} avatar={Cookies.get('profile_picture')} />
      </div>
    )
  }
  // if(popout===true)
  // {
  //   torender=(<div class="loader">
  //   <div class="loader__bar"></div>
  //   <div class="loader__bar"></div>
  //   <div class="loader__bar"></div>
  //   <div class="loader__bar"></div>
  //   <div class="loader__bar"></div>
  //   <div class="loader__ball"></div>
  // </div>)
  // }

  return (
    <div className="App">
      {torender}
    </div>
  );
}

export default App;
