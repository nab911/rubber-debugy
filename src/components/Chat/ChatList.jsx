import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from './actions';
import './Chat.css';

function mapStateToProps(state) {
  return {
    messages: state.messages
  }
}

class ChatListImpl extends Component {
  render() {
    return (
      <div className="ChatList col-md-8 col-md-offset-2">
        {this.props.messages.map((message, idx) =>
          <div key={idx} className={ message.message_type+"-message bubble" }>{message.text}</div>
        )}
      </div>
    );
  }
}

const ChatList = connect(
  mapStateToProps,
  actions
)(ChatListImpl);
export default ChatList;