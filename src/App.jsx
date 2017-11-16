import React from "react";
import Duck from "./components/Duck";
import ChatInput from "./components/Chat/ChatInput";
import ChatList from "./components/Chat/ChatList";

import "./App.css";

const App = () => (
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
      <a href="https://github.com/nab911/rubber-debugy" target="_blank" rel="noopener noreferrer">
        <img className="github-octocat" alt="octocat" src="/img/Octocat.jpg" />
      </a>
    </div>
  </div>
);

export default App;
