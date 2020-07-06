import { connect } from "react-redux";
import FormWizard from "dataEntryApp/views/registration/FormWizard";
import { ObservationsHolder, Individual, SubjectType } from "avni-models";
import {
  updateExitObs as updateObs,
  saveProgramEnrolment
} from "dataEntryApp/reducers/programEnrolReducer";
import { withRouter } from "react-router-dom";
import { setValidationResults } from "dataEntryApp/reducers/registrationReducer";

const mapFormStateToProps = state => ({
  form: state.dataEntry.enrolmentReducer.enrolForm,
  subject: state.dataEntry.subjectProfile.subjectProfile,
  //observations: state.dataEntry.enrolmentReducer.programEnrolment.observations,
  //obsHolder: new ObservationsHolder(state.dataEntry.enrolmentReducer.programEnrolment.observations),
  observations: state.dataEntry.enrolmentReducer.programEnrolment.programExitObservations,
  obsHolder: new ObservationsHolder(
    state.dataEntry.enrolmentReducer.programEnrolment.programExitObservations
  ),
  title: `New Enrolment`,
  saved: state.dataEntry.enrolmentReducer.saved,
  onSaveGoto: "/app/subject?uuid=" + state.dataEntry.subjectProfile.subjectProfile.uuid,
  validationResults: state.dataEntry.registration.validationResults
});
//need to change observations
const mapFormDispatchToProps = {
  updateObs,
  onSave: saveProgramEnrolment,
  setValidationResults
};

const ProgramExitEnrolmentForm = withRouter(
  connect(
    mapFormStateToProps,
    mapFormDispatchToProps
  )(FormWizard)
);

export default ProgramExitEnrolmentForm;
