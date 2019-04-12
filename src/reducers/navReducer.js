const initialState = {
  home: false,
  login: false,
  signup: false,
  logout: false,
  instruments: false,
  redirect: false,
  redirectTo: ""
};

export default function navReducer(state = initialState, action) {
  switch (action.type) {
    case "SET_REDIRECT_STATE":
      // console.log(action.payload)
      // console.log(action.payload.clickedSpan)
      if (
        action.payload.url !==
        "/" + action.payload.clickedSpan.toLowerCase()
      ) {
        return { ...state, [action.payload.clickedSpan]: true };
      } else {
        return state;
      }

    case "RESET_SHOW_REDIRECT":
      return { ...state, redirect: false, redirectTo: "" };

    case "RESET_REDIRECT_STATE":
      return {
        ...state,
        home: false,
        login: false,
        signup: false,
        logout: false,
        instruments: false
      };

    default:
      return state;
  }
}
