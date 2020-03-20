import { all, call, fork, put, takeLatest } from "redux-saga/effects";
import { types, setRules } from "../reducers/rulesReducer";
import api from "../api";

export default function*() {
  yield all([rulesFetchWatcher].map(fork));
}

export function* rulesFetchWatcher() {
  yield takeLatest(types.GET_RULES, rulesFetchWorker);
}

export function* rulesFetchWorker({ reqUrl, reqBody }) {
  const rulesData = yield call(api.fetchRules, reqUrl, reqBody);
  console.log("insaga" + rulesData);
  yield put(setRules(rulesData));
}
