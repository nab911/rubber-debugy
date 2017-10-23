export const addDuckMessage = (message) => {
  return {
    type: 'ADD_DUCK_MESSAGE',
    payload: message
  }
}

export const addUserMessage = (message) => {
  return {
    type: 'ADD_USER_MESSAGE',
    payload: message
  }
}