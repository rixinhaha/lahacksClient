import React, { useEffect } from 'react';
import './Messages.css';
import Message from '../Message/Message';

const Messages = (props) => {
  let myRef=React.createRef();
  useEffect(()=>{
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
        {props.messages.map((message, i) => <div key={i}><Message message={message} name={props.name}/></div>)}
    </div>
  )
}

export default Messages;