import React, {Component} from 'react';
import {Message} from './Message.jsx'

/* functional component that applies a function to the message list */
export function MessageList(props) {
    const eachMessage = props.messages.map((message)=><Message message={message} key={message.id}/>)
    return (
      <main className="messages">
        {eachMessage}
      </main>
    )
}
