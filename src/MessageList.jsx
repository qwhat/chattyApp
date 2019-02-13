import React, {Component} from 'react';
import Message from './Message.jsx'

export default class MessageList extends Component {
  render() {
    const eachMessage = this.props.messages.map((message)=><Message message={message} key={message.id}/>)
    return (
      <main className="messages">
        {eachMessage}
      </main>
    )
  }
}
