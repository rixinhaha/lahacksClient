import React from 'react';
import './Messages.css';
import ScrollToBottom from 'react-scroll-to-bottom';
import Message from '../Message/Message'

const Messages = ({messages, userid}) => (
        <ScrollToBottom className="messages">
        {messages.map((message, i) => <div key={i}><Message message={message} userid={userid}/></div>)}
      </ScrollToBottom>
)

export default Messages;