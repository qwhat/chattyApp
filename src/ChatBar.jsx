import React, {Component} from 'react';

/* functional component that creates the chat bar */
export function ChatBar(props){
    return (
      <footer className="chatbar">
        <input
          className="chatbar-username"
          placeholder="Your Name (Optional)"
          defaultValue={props.currentUser}
          onKeyPress={props.handleNameChange}
          maxLength="24"
        />
        <input
          className="chatbar-message"
          placeholder="Type a message and hit ENTER"
          onKeyPress={props.handleMessage}
          minLength="1"
        />
      </footer>
    )
}
