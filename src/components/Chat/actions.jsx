export const addDuckMessage = (text) => {
  return {
    type: 'ADD_DUCK_MESSAGE',
    text: text
  }
}

export const addUserMessage = (text) => {
  return {
    type: 'ADD_USER_MESSAGE',
    text: text
  }
}