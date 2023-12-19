import {call, put, takeEvery} from "redux-saga/effects";

import Api from "../../services/Api";

import {$A, showErrorMessage} from "../../utils";

import * as $ from "../actionTypes";

const tryTheGuardianSearch = function* ({payload}) {
  try {
    const data = yield call(Api.theGuardianSearch, payload);

    if (!Array.isArray(data.docs)) throw new Error();

    yield put($A($.THE_GUARDIAN_SEARCH_FINISHED, data));
  } catch (error) {
    showErrorMessage(error, "Couldn't get The Guardian News!");
  }
};

const tryNewYorkTimesSearch = function* ({payload}) {
  try {
    const data = yield call(Api.newYorkTimesSearch, payload);

    if (!Array.isArray(data.docs)) throw new Error();

    yield put($A($.NEW_YORK_TIMES_FINISHED, data));
  } catch (error) {
    showErrorMessage(error, "Couldn't get New York Times News!");
  }
};

const tryGetTheGuardianCategories = function* () {
  try {
    const categories = yield call(Api.getTheGuardianCategories);

    if (!Array.isArray(categories)) throw new Error();

    yield put($A($.GET_THE_GUARDIAN_CATEGORIES_FINISHED, categories));
  } catch (error) {
    showErrorMessage(error, "Couldn't get The Guardian categories!");
  }
};

const tryGetNewYorkTimesCategories = function* () {
  try {
    const categories = yield call(Api.getNewYorkTimesCategories);

    if (!Array.isArray(categories)) throw new Error();

    yield put($A($.GET_NEW_YORK_TIMES_CATEGORIES_FINISHED, categories));
  } catch (error) {
    showErrorMessage(error, "Couldn't get New York Times categories!");
  }
};

// prettier-ignore
export default function* () {
  yield takeEvery($.THE_GUARDIAN_SEARCH_REQUEST, tryTheGuardianSearch);
  yield takeEvery($.NEW_YORK_TIMES_REQUEST, tryNewYorkTimesSearch);
  yield takeEvery($.GET_THE_GUARDIAN_CATEGORIES_REQUEST, tryGetTheGuardianCategories);
  yield takeEvery($.GET_NEW_YORK_TIMES_CATEGORIES_REQUEST, tryGetNewYorkTimesCategories);
}
