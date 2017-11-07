import { combineReducers } from "redux";

let messageId = 0;

const messages = (state = [], action) => {
  // console.log('Action receieved:');
  // console.log(action);
  // console.log(state);
  if (action.type === "ADD_MESSAGE") {
    messageId += 1;
    return [{ id: messageId, text: action.payload.text, message_type: action.payload.type }, ...state];
  }

  return state;
};

const rootReducer = combineReducers({ messages: messages });

export default rootReducer;
