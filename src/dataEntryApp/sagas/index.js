import referenceDataSaga from "./referenceDataSaga";
import subjectSaga from "./subjectSaga";
import { all, fork } from "redux-saga/effects";
import subjectDashboardSaga from "./subjectDashboardSaga";
import generalSubjectDashboardSaga from "./generalSubjectDashboardSaga";
import programSubjectDashboardSaga from "./programSubjectDashboardSaga";
import { saveUserInfoWatcher } from "rootApp/saga";
import programSaga from "./programSaga";
// import translationApiSaga from "../sagas/TranslationSaga"
import rulesSaga from "./rulesSaga";

export default function* rootSaga() {
  yield all(
    [
      referenceDataSaga,
      subjectSaga,
      subjectDashboardSaga,
      generalSubjectDashboardSaga,
      programSubjectDashboardSaga,
      saveUserInfoWatcher,
      programSaga,
      rulesSaga
      // translationApiSaga
    ].map(fork)
  );
}
