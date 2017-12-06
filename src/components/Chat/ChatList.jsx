import React from "react";
import { connect } from "react-redux";

import "./Chat.css";

function mapStateToProps(state) {
  return {
    messages: state.messages
  };
}

const ChatList = props => (
  <div className="ChatList col-md-8 col-md-offset-2">
    {props.messages.map(message => (
      <div key={message.id} className={`${message.type}-message bubble`}>
        {message.text}
      </div>
    ))}
  </div>
);

export default connect(mapStateToProps)(ChatList);
