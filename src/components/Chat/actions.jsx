export const addMessage = (message, type) => ({
  type: "ADD_MESSAGE",
  payload: {
    text: message,
    type: type
  }
});

export default "";
