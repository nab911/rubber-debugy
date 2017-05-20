import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from './actions';
import './Chat.css';

function mapStateToProps(state) {
  return {}
}

class ChatInputImpl extends Component {
  render() {
    return (
      <div className="ChatInput col-md-8 col-md-offset-2">
        <input
          type="text"
          id="chat-input"
          ref="chatInput"
          className="form-control"
          placeholder="What do you want to say?"
          onKeyPress={(e) => this._handleKeyPress(e)}
        />
      </div>
    );
  }

  _handleKeyPress(e) {
    if (e.key === 'Enter') {
      let message = this.refs.chatInput.value;
      let self = this;

      self.props.addUserMessage(message);

      fetch('/api/message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message })
      }).then((result) => {
        return result.json();
      }).then((result) => {
        self.props.addDuckMessage(result.data.response.reply);
      })
    }
  }
}

const ChatInput = connect(
  mapStateToProps,
  actions
)(ChatInputImpl);
export default ChatInput;