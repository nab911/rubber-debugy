export const addMessage = (message, type) => {
  return {
    type: 'ADD_MESSAGE',
    payload: {
    	text: message,
    	type: type
    }
  };
};