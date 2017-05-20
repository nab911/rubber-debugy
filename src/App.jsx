import React, { Component } from 'react';
import Duck from './components/Duck';
import ChatInput from './components/Chat/ChatInput';
import ChatList from './components/Chat/ChatList';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <Duck />
        </div>

        <div className="App-body">
          <ChatInput />
          <ChatList />
        </div>
      </div>
    );
  }
}

export default App;