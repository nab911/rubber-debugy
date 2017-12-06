import { combineReducers } from "redux";

let messageId = 0;

const messages = (state = [], action) => {
  if (action.type === "ADD_MESSAGE") {
    messageId += 1;
    return [{ id: messageId, text: action.payload.text, type: action.payload.type }, ...state];
  }

  return state;
};

const feedback = (state = { feedback_needed: false, feedback_given: false }, action) => {
  if (action.type === "FEEDBACK_GIVEN") {
    return {
      ...state,
      feedback_given: true,
      feedback_needed: false
    };
  }

  if (action.type === "FEEDBACK_NEEDED") {
    return {
      ...state,
      feedback_needed: true
    };
  }

  return state;
};

const rootReducer = combineReducers({ messages: messages, feedback: feedback });

export default rootReducer;
