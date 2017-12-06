import * as _ from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";

import * as actions from "./actions";
import "./Chat.css";

function mapStateToProps(state) {
  return {
    feedback: state.feedback,
    messages: state.messages
  };
}

class ChatFeedback extends Component {
  handleFeedback(feedback) {
    const input = _.find(this.props.messages, message => message.type === "user").text;
    const response = _.find(this.props.messages, message => message.type === "duck").text;
    const self = this;

    fetch(`/api/feedback/${feedback}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "same-origin",
      body: JSON.stringify({ input, response })
    })
      .then(result => result.json())
      .then(() => {
        self.props.feedbackGiven();
      });
  }

  render() {
    let feedback;

    if (this.props.feedback.feedback_needed) {
      feedback = (
        <div>
          How was that last response?
          <span
            className="glyphicon glyphicon-thumbs-up"
            aria-hidden="true"
            onClick={() => {
              this.handleFeedback("approve");
            }}
          />
          <span
            className="glyphicon glyphicon-thumbs-down"
            aria-hidden="true"
            onClick={() => this.handleFeedback("reject")}
          />
        </div>
      );
    } else if (this.props.feedback.feedback_given) {
      feedback = <div>Thanks!</div>;
    }

    return <div className="ChatFeedback col-xs-12 text-center">{feedback}</div>;
  }
}

export default connect(mapStateToProps, actions)(ChatFeedback);
