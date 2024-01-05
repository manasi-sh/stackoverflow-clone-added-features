const loginHistoryReducer = (state = [], action) => {
    switch (action.type) {
      case "FETCH_HISTORY":
        return action.payload;
      // Handle other actions if needed
      default:
        return state;
    }
  };
  
  export default loginHistoryReducer;