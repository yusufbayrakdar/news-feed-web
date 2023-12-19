import * as $ from "../actionTypes";

const initialState = {
  saveUserPreferredCategoriesLoading: false,
  categoryModalVisible: false,
  categoryModalCanceled: false
};

export default (state = initialState, {type, payload}) => {
  switch (type) {
    case $.SAVE_PREFERRED_CATEGORIES_REQUEST:
      return {...state, saveUserPreferredCategoriesLoading: true};

    case $.SAVE_PREFERRED_CATEGORIES_FINISHED:
      return {...state, saveUserPreferredCategoriesLoading: false};

    case $.SET_CATEGORY_MODAL_VISIBLE:
      return {...state, categoryModalVisible: payload};

    case $.SET_CATEGORY_MODAL_CANCELED:
      return {...state, categoryModalCanceled: payload};

    default:
      return state;
  }
};
