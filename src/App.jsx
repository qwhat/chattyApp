import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx'
import MessageList from './MessageList.jsx'


class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      currentUser: "Anonymous",
      messages: []
    }
  }

  componentDidMount() {
    const url = 'ws://0.0.0.0:3001/'
    this.socket = new WebSocket(url);
    this.socket.onopen = event => {
      console.log("Connected to socket server");

    }
    this.socket.onmessage = message => {
      const serverMessage = JSON.parse(message.data);
      this.setState({messages:[...this.state.messages, serverMessage]})

    }


    setTimeout(() => {
      console.log("Simulating incoming message");
      // Add a new message to the list of messages in the data store
      const newMessage = {id: 1, type:"incomingMessage", username: "Michelle", content: "Hello there!"};
      const messages = this.state.messages.concat(newMessage)
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({messages: messages})
    }, 3000);
  }

  handleKeyPress = event => {
    if(event.key === 'Enter'){
      const newMessage = {type:"incomingMessage", username:this.state.currentUser, content:(event.target.value)}
      this.socket.send(JSON.stringify(newMessage))
      event.target.value = ''
    }
  }

  handleNameChange = event => {
    if(event.key === 'Enter'){
      const oldUser = this.state.currentUser;
      const newUser = event.target.value;
      this.setState({currentUser:(newUser)});
      const newNotif = {type:"incomingNotification", oldUser:oldUser, newUser: newUser}
      this.socket.send(JSON.stringify(newNotif))
    }
  }


  render() {
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>
        <MessageList messages={this.state.messages} />
        <ChatBar
          currentUser={this.state.currentUser}
          handleKeyPress={this.handleKeyPress}
          handleNameChange={this.handleNameChange}
        />
      </div>
    );
  }
}
export default App;
