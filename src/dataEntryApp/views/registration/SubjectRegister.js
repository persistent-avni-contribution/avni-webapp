import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Checkbox, FormControlLabel, TextField } from "@material-ui/core";
import {
  createSubject,
  getRegistrationForm,
  updateSubject
} from "../../reducers/subjectReducer";
import { getGenders } from "../../reducers/metadataReducer";
import ScreenWithAppBar from "../../components/ScreenWithAppBar";
import { first, sortBy } from "lodash";
import Loading from "../../components/Loading";
import { LineBreak } from "../../../common/components";
import { CodedFormElement, Form } from "../../components/Form";

const SubjectRegister = props => {
  React.useEffect(() => {
    props.getRegistrationForm();
    props.getGenders();
    props.createSubject();
  }, []);

  if (!(props.newSubject && props.genders && props.form)) {
    return <Loading />;
  }

  return (
    <ScreenWithAppBar appbarTitle={`${props.subjectType.name} Registration`}>
      <TextField
        label="Date of Registration"
        type="date"
        required
        name="registrationDate"
        defaultValue={new Date()}
        InputLabelProps={{
          shrink: true
        }}
      />
      <LineBreak num={2} />
      <TextField
        label="First Name"
        type="text"
        required
        name="firstName"
        value={props.newSubject.firstName}
        onChange={e => {
          props.updateSubject("firstName", e.target.value);
        }}
      />
      <TextField
        label="Last Name"
        type="text"
        required
        name="lastName"
        value={props.newSubject.lastName}
        onChange={e => {
          props.updateSubject("lastName", e.target.value);
        }}
      />
      <LineBreak num={2} />
      <TextField
        label="Date of Birth"
        type="date"
        required
        name="dateOfBirth"
        defaultValue={new Date()}
        value={props.newSubject.dateOfBirth}
        onChange={e => {
          props.updateSubject("dateOfBirth", e.target.value);
        }}
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={props.newSubject.dateOfBirthVerified}
            onChange={e => {
              props.updateSubject("dateOfBirthVerified", e.target.checked);
            }}
            value="checkedB"
            color="primary"
          />
        }
        label="Date of Birth Verified"
      />
      <LineBreak num={2} />
      <CodedFormElement
        groupName="Gender"
        items={sortBy(props.genders, "name")}
        isChecked={item => props.newSubject.gender.uuid === item.uuid}
        onChange={selected => props.updateSubject("gender", selected)}
      />
      <LineBreak num={4} />
      <Form obs={props.newSubject.observations} updateObs={() => {}}>
        {props.form}
      </Form>
    </ScreenWithAppBar>
  );
};

const mapStateToProps = state => ({
  user: state.app.user,
  subjectType:
    state.dataEntry.subject.registrationSubjectType ||
    first(state.dataEntry.metadata.operationalModules.subjectTypes),
  genders: state.dataEntry.metadata.genders,
  form: state.dataEntry.subject.registrationForm,
  newSubject: state.dataEntry.subject.newSubject
});

const mapDispatchToProps = {
  getRegistrationForm,
  createSubject,
  updateSubject,
  getGenders
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(SubjectRegister)
);
