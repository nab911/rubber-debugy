import React, { Component } from "react";
import { connect } from "react-redux";

import * as actions from "./actions";
import "./Chat.css";

function mapStateToProps() {
  return {};
}

class ChatInput extends Component {
  componentDidMount() {
    this.chatInput.focus();
  }

  handleKeyPress(e) {
    if (e.key === "Enter") {
      const message = this.chatInput.value;
      const self = this;

      self.props.addMessage(message, "user");

      fetch("/api/message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "same-origin",
        body: JSON.stringify({ message })
      })
        .then(result => result.json())
        .then(result => {
          self.chatInput.value = "";
          self.chatInput.focus();
          self.props.addMessage(result.response.reply, "duck");
          self.props.feedbackNeeded();
        });
    }
  }

  render() {
    return (
      <div className="ChatInput col-md-8 col-md-offset-2">
        <input
          type="text"
          id="chat-input"
          ref={ref => {
            this.chatInput = ref;
          }}
          className="form-control"
          placeholder="What do you want to say?"
          onKeyPress={e => this.handleKeyPress(e)}
        />
      </div>
    );
  }
}

export default connect(mapStateToProps, actions)(ChatInput);
