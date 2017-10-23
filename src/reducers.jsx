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
          {text: action.payload, message_type: 'duck'},
          ...state.messages
        ]
      })
    case 'ADD_USER_MESSAGE':
      return Object.assign({}, state, {
        messages: [
          {text: action.payload, message_type: 'user'},
          ...state.messages
        ],
      })
    default:
      return state
  }
}

export default rubberDebugy