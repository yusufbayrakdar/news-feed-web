import * as $ from "../actionTypes";

const initialState = {
  loggedIn: false,
  user: null,
  autoLoginInLoading: false
};

export default (state = initialState, {type, payload}) => {
  switch (type) {
    case $.LOGIN_REQUEST:
      return {...state, loginInProgress: true};

    case $.LOGIN_SUCCESS:
      return {
        ...state,
        loginInProgress: false,
        user: payload,
        loggedIn: true
      };

    case $.LOGIN_FAILURE:
      return {...state, loginInProgress: false, loggedIn: false, user: null};

    case $.AUTO_LOGIN_REQUEST:
      return {...state, autoLoginInLoading: true};

    case $.AUTO_LOGIN_SUCCESS:
      return {
        ...state,
        autoLoginInLoading: false,
        user: payload,
        loggedIn: true
      };

    case $.AUTO_LOGIN_FAILURE:
      return {
        ...state,
        autoLoginInLoading: false,
        loggedIn: false,
        user: null
      };
    default:
      return state;
  }
};
