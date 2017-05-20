const initialState = {
  messages: []
};

const rubberDebugy = (state = initialState, action) => {
  console.log('Action receieved:');
  console.log(action);
  console.log(state);
  switch (action.type) {
    case 'ADD_DUCK_MESSAGE':
      return Object.assign({}, state, {
        messages: [
          ...state.messages,
          {text: action.text, message_type: 'duck'}
        ]
      })
    case 'ADD_USER_MESSAGE':
      return Object.assign({}, state, {
        messages: [
          ...state.messages,
          {text: action.text, message_type: 'user'}
        ],
      })
    default:
      return state
  }
}

export default rubberDebugy