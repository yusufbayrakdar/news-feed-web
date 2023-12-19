import {call, put, takeEvery} from "redux-saga/effects";

import Api from "../../services/Api";

import {$A, showErrorMessage} from "../../utils";

import * as $ from "../actionTypes";

const trySaveUserPreferredCategories = function* ({payload}) {
  try {
    yield call(Api.saveUserPreferredCategories, payload);

    yield put($A($.SAVE_PREFERRED_CATEGORIES_FINISHED));
    yield put($A($.AUTO_LOGIN_REQUEST));
  } catch (error) {
    showErrorMessage(error, "Couldn't save categories!");
  }
};

// prettier-ignore
export default function* () {
  yield takeEvery($.SAVE_PREFERRED_CATEGORIES_REQUEST, trySaveUserPreferredCategories);
}
