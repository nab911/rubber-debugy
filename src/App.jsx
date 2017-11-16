import React, { Component } from "react";
import Duck from "./components/Duck";
import ChatInput from "./components/Chat/ChatInput";
import ChatList from "./components/Chat/ChatList";

import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header col-md-6 col-xs-12" />

        <div className="App-body col-xs-12">
          <div className="col-md-6 col-xs-12">
            <Duck />
          </div>
          <div className="col-md-6 col-xs-12">
            <ChatInput />
            <ChatList />
          </div>
        </div>

        <div className="App-footer col-xs-12 text-center">
          <a href="https://github.com/nab911/rubber-debugy">
            <img className="github-octocat" src="/img/Octocat.jpg" />
          </a>
        </div>
      </div>
    );
  }
}

export default App;
