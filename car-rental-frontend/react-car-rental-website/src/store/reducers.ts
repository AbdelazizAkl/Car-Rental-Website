interface AppState {
    isSignedIn: boolean;
  }
  
  const initialState: AppState = {
    isSignedIn: false,
  };
  
  const rootReducer = (state = initialState, action: any) => {
    switch (action.type) {
      case "SET_SIGNED_IN":
        return { ...state, isSignedIn: action.payload };
      default:
        return state;
    }
  };
  
  export default rootReducer;