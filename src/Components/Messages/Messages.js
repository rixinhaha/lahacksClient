import React, { useEffect } from 'react';
import './Messages.css';
import Message from '../Message/Message';



const Messages = (props) => {
  let myRef=React.createRef();
  useEffect(()=>{
    console.log(props.newmessage)
    if(props.newmessage==='new')
    {
      var div = myRef.current;
      div.scrollTop = div.scrollHeight-div.clientHeight;
    }
  },[props.messages])

  let handleScroll = (e) => {
    var element = e.target;
    if (element.scrollTop===0)
    {
      props.loadOldmessages()
    }
  }
  return( 
    <div ref={myRef}className="messages" onScroll={handleScroll}>
        {console.log(props.messages)}
        {props.messages.map((message, i) => <div key={i}>{console.log(message)}<Message message={message} name={props.name}/></div>)}
    </div>
  )
}

export default Messages;