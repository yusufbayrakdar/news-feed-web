import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import createSagaMiddleware from "redux-saga";
import {all} from "redux-saga/effects";

import authReducer from "./auth/authReducer";
import authSaga from "./auth/authSaga";
import newsReducer from "./news/newsReducer";
import newsSaga from "./news/newsSaga";
import userReducer from "./user/userReducer";
import userSaga from "./user/userSaga";

const combinedSagas = function* () {
  yield all([authSaga(), newsSaga(), userSaga()]);
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
  auth: authReducer,
  news: newsReducer,
  user: userReducer
});

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(sagaMiddleware)));

sagaMiddleware.run(combinedSagas);

export default store;
