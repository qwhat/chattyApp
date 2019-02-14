import React, {Component} from 'react';

export default class Message extends Component {
  render() {
    if(this.props.message.type === "incomingMessage") {
      return (
      <div className="message">
        <span className="message-username">{this.props.message.username}</span>
        <span className="message-content">{this.props.message.content}</span>
      </div>
    )} else if (this.props.message.type === "message system"){
      return (
        <div className="message system">
          Anonymous1 changed their name to nomnom.
        </div>
      )
    }
  }
}
