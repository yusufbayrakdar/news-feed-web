import * as $ from "../actionTypes";

const initialState = {
  loggedIn: false,
  user: null,
  signUpInProgress: false,
  loginInProgress: false,
  autoLoginInLoading: false
};

export default (state = initialState, {type, payload}) => {
  switch (type) {
    case $.SIGNUP_REQUEST:
      return {...state, loginInProgress: true};

    case $.SIGNUP_SUCCESS:
      return {
        ...state,
        signUpInProgress: false,
        user: payload,
        loggedIn: true
      };

    case $.SIGNUP_FAILURE:
      return {...state, signUpInProgress: false, loggedIn: false, user: null};

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
