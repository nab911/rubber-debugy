export const addMessage = (message, type) => ({
  type: "ADD_MESSAGE",
  payload: {
    text: message,
    type: type
  }
});

export const feedbackNeeded = isCommand => ({
  type: "FEEDBACK_NEEDED",
  payload: {
    isCommand
  }
});

export const feedbackGiven = () => ({
  type: "FEEDBACK_GIVEN"
});

export default "";
