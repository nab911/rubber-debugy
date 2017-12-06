export const addMessage = (message, type) => ({
  type: "ADD_MESSAGE",
  payload: {
    text: message,
    type: type
  }
});

export const feedbackNeeded = () => ({
  type: "FEEDBACK_NEEDED"
});

export const feedbackGiven = () => ({
  type: "FEEDBACK_GIVEN"
});

export default "";
