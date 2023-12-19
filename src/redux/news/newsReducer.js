import * as $ from "../actionTypes";

const initialState = {
  feedNews: {
    docs: []
  },

  newsLoading: false,

  theGuardianCategories: [],
  newYorkTimesCategories: []
};

export default (state = initialState, {type, payload}) => {
  switch (type) {
    case $.THE_GUARDIAN_SEARCH_REQUEST:
      return {...state, newsLoading: true};

    case $.THE_GUARDIAN_SEARCH_FINISHED:
      return {
        ...state,
        feedNews: payload,
        newsLoading: false
      };

    case $.NEW_YORK_TIMES_REQUEST:
      return {...state, newsLoading: true};

    case $.NEW_YORK_TIMES_FINISHED:
      return {
        ...state,
        feedNews: payload,
        newsLoading: false
      };

    case $.GET_THE_GUARDIAN_CATEGORIES_FINISHED:
      return {
        ...state,
        theGuardianCategories: payload
      };

    case $.GET_NEW_YORK_TIMES_CATEGORIES_FINISHED:
      return {
        ...state,
        newYorkTimesCategories: payload
      };

    default:
      return state;
  }
};
