import React, {Component} from 'react';

export function Message(props) {
    if(props.message.type === "incomingMessage") {
      return (
      <div className="message">
        <span className="message-username">{props.message.username}</span>
        <span className="message-content">{props.message.content}</span>
      </div>
    )} else if (props.message.type === "incomingNotification"){
      return (
        <div className="message system">
          {props.message.oldUser} changed their name to {props.message.newUser}.
        </div>
      )
    }
}
