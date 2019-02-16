import React, {Component} from "react";
import {ChatBar} from "./ChatBar.jsx"
import {MessageList} from "./MessageList.jsx"

/* Main functionality class */
class App extends Component {

  constructor(props){
    super(props);
    /* base state for our page */
    this.state = {
      userCount: 0,
      currentUser: "Anonymous",
      messages: []
    };
  };

  componentDidMount() {
    const url = "ws://0.0.0.0:3001/"
    this.socket = new WebSocket(url);
    this.socket.onopen = event => {
      console.log("Connected to socket server");
    };
    /* defines what happens with messages sent from server.js */
    this.socket.onmessage = message => {
      /* parses message sent from server and checks its message type */
      const serverMessage = JSON.parse(message.data);
      switch (serverMessage.type) {
        case ("incomingMessage"):
        case ("incomingNotification"):
          this.setState({messages:[...this.state.messages, serverMessage]});
          break;
        case ("userTotal"):
          this.setState({userCount:serverMessage.userCount});
          break;
        default:
          throw new Error("unknown event type " + serverMessage.type);
      }
    };
  };
  /* Message input event handler*/
  handleMessage = event => {
    if(event.key === "Enter"){
      const newMessage = {type:"incomingMessage", username:this.state.currentUser, content:(event.target.value)};
      /* sends the new information to the WebSockets server */
      this.socket.send(JSON.stringify(newMessage));
      event.target.value = "";
    }
  };
  /* Name change event handler */
  handleNameChange = event => {
    if(event.key === "Enter"){
      const oldUser = this.state.currentUser;
      const newUser = event.target.value;
      const newNotif = {type:"incomingNotification", oldUser:oldUser, newUser: newUser};
      /* sends the new information to the WebSockets server */
      this.setState({currentUser:(newUser)});
      this.socket.send(JSON.stringify(newNotif));
    }
  };

  render() {
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
          <span className="user-count">{this.state.userCount} users online</span>
        </nav>
        <MessageList messages={this.state.messages} />
        <ChatBar
          currentUser={this.state.currentUser}
          handleMessage={this.handleMessage}
          handleNameChange={this.handleNameChange}
        />
      </div>
    );
  }
};
export default App;
