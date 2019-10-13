const initialState = {
  user: {}
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CREATE_USER":
      localStorage.setItem("token", action.payload.jwt);
      return { ...state, user: action.payload.user };

    case "LOGIN_USER":
      localStorage.setItem("token", action.payload.jwt);
      return { ...state, user: action.payload.user };

    case "SET_USER":
      return { ...state, user: action.payload.user };

    case "LOG_OUT":
      localStorage.clear();
      return { ...state, user: {} };

    default:
      return state;
  }
};

export default userReducer;
