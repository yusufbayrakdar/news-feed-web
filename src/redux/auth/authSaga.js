import {call, put, takeEvery, takeLatest} from "redux-saga/effects";

import Api from "../../services/Api";

import {$A, TOKEN, showErrorMessage, showWarningMessage} from "../../utils";

import * as $ from "../actionTypes";

const tryLoginSaga = function* ({payload}) {
  try {
    localStorage.setItem(TOKEN, "");
    const {user, token} = yield call(Api.login, payload);

    localStorage.setItem(TOKEN, token);

    yield put($A($.LOGIN_SUCCESS, user));
  } catch (error) {
    showErrorMessage(error, "Login Failed!");
    yield put($A($.LOGIN_FAILURE));
  }
};

const tryAutoLoginSaga = function* () {
  try {
    const token = localStorage.getItem(TOKEN);
    if (token) {
      const {user} = yield call(Api.autoLogin);

      yield put($A($.AUTO_LOGIN_SUCCESS, user));
    } else {
      yield put($A($.AUTO_LOGIN_FAILURE));
    }
  } catch {
    yield put($A($.AUTO_LOGIN_FAILURE));
  }
};

const tryLogoutSaga = function* () {
  try {
    localStorage.setItem(TOKEN, "");
    window.location.href = "/" + (window.location.pathname !== "/" ? `?redirect=${window.location.pathname}` : "");

    yield put($A($.SET_CATEGORY_MODAL_CANCELED, false));
  } catch {
    showWarningMessage("Logout Error!");
  }
};

// prettier-ignore
export default function* () {
  yield takeEvery($.LOGIN_REQUEST, tryLoginSaga);
  yield takeEvery($.AUTO_LOGIN_REQUEST, tryAutoLoginSaga);
  yield takeLatest($.LOGOUT_REQUEST, tryLogoutSaga);
}
