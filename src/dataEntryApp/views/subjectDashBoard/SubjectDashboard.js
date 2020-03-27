import React, { Fragment, useEffect } from "react";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import ProfileDetails from "./components/ProfileDetails";
import SubjectDashboardTabs from "./components/SubjectDashboardTabs";
import { getSubjectProfile } from "../../reducers/subjectDashboardReducer";
import { getSubjectGeneral } from "../../reducers/generalSubjectDashboardReducer";
import { getSubjectProgram } from "../../reducers/programSubjectDashboardReducer";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { withParams } from "common/components/utils";
import Breadcrumbs from "dataEntryApp/components/Breadcrumbs";
import { getRules } from "../../reducers/rulesReducer";

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2),
    margin: theme.spacing(1, 3),
    flexGrow: 1
  }
}));
const requestBody = {
  uuid: "4afae9eb-aa3a-45d9-a9bc-064b8fdcc4ac",
  name: null,
  encounterType: {
    uuid: "0126df9e-0167-4d44-9a2a-ae41cfc58d3d",
    name: "Nutritional status and Morbidity",
    operationalEncounterTypeName: "Nutritional status and Morbidity",
    displayName: "Nutritional status and Morbidity"
  },
  earliestVisitDateTime: null,
  maxVisitDateTime: null,
  encounterDateTime: "2020-03-11T10:59:32.000Z",
  programEnrolmentUUID: "ac895795-54e0-418b-b96d-410ca6cc639e",
  observations: [
    {
      concept: {
        name: "Whether having cough and cold",
        datatype: "Coded",
        uuid: "e6bd3ca9-caed-462a-bf7a-1614269ebeaa",
        unit: null,
        lowAbsolute: null,
        lowNormal: null,
        hiNormal: null,
        hiAbsolute: null,
        answers: {
          "0": {
            uuid: "48a55b75-2ff9-440a-84fb-795d29f97a75",
            concept: {
              uuid: "e7b50c78-3d90-484d-a224-9887887780dc",
              name: "No",
              datatype: "NA",
              answers: {},
              lowAbsolute: null,
              hiAbsolute: null,
              lowNormal: null,
              hiNormal: null,
              unit: null,
              keyValues: {},
              voided: false
            },
            answerOrder: 2,
            abnormal: false,
            unique: false,
            voided: false
          },
          "1": {
            uuid: "b1b5da7b-50b6-4c02-b933-03bd2975145a",
            concept: {
              uuid: "04bb1773-c353-44a1-a68c-9b448e07ff70",
              name: "Yes",
              datatype: "NA",
              answers: {},
              lowAbsolute: null,
              hiAbsolute: null,
              lowNormal: null,
              hiNormal: null,
              unit: null,
              keyValues: {},
              voided: false
            },
            answerOrder: 1,
            abnormal: false,
            unique: false,
            voided: false
          }
        }
      },
      valueJSON: {
        answer: "e7b50c78-3d90-484d-a224-9887887780dc"
      }
    },
    {
      concept: {
        name: "Baby has got diarrohea",
        datatype: "Coded",
        uuid: "d7ae84be-0642-4e46-9d91-699574082abb",
        unit: null,
        lowAbsolute: null,
        lowNormal: null,
        hiNormal: null,
        hiAbsolute: null,
        answers: {
          "0": {
            uuid: "b0ef4333-5d9a-4f4a-83e6-81b1503b4039",
            concept: {
              uuid: "04bb1773-c353-44a1-a68c-9b448e07ff70",
              name: "Yes",
              datatype: "NA",
              answers: {},
              lowAbsolute: null,
              hiAbsolute: null,
              lowNormal: null,
              hiNormal: null,
              unit: null,
              keyValues: {},
              voided: false
            },
            answerOrder: 1,
            abnormal: false,
            unique: false,
            voided: false
          },
          "1": {
            uuid: "6e1bad13-a896-4783-8f27-97e2e6780c58",
            concept: {
              uuid: "e7b50c78-3d90-484d-a224-9887887780dc",
              name: "No",
              datatype: "NA",
              answers: {},
              lowAbsolute: null,
              hiAbsolute: null,
              lowNormal: null,
              hiNormal: null,
              unit: null,
              keyValues: {},
              voided: false
            },
            answerOrder: 2,
            abnormal: false,
            unique: false,
            voided: false
          }
        }
      },
      valueJSON: {
        answer: "e7b50c78-3d90-484d-a224-9887887780dc"
      }
    },
    {
      concept: {
        name: "Is current weight of the child equal to or less than the previous months weight?",
        datatype: "Coded",
        uuid: "158d59f3-5933-46ea-9601-7008047ea079",
        unit: null,
        lowAbsolute: null,
        lowNormal: null,
        hiNormal: null,
        hiAbsolute: null,
        answers: {
          "0": {
            uuid: "cf67ccb1-5e40-4145-97aa-442bbc9bac69",
            concept: {
              uuid: "04bb1773-c353-44a1-a68c-9b448e07ff70",
              name: "Yes",
              datatype: "NA",
              answers: {},
              lowAbsolute: null,
              hiAbsolute: null,
              lowNormal: null,
              hiNormal: null,
              unit: null,
              keyValues: {},
              voided: false
            },
            answerOrder: 1,
            abnormal: false,
            unique: false,
            voided: false
          },
          "1": {
            uuid: "65675c23-a8a3-4ff9-a519-d2e48698006f",
            concept: {
              uuid: "e7b50c78-3d90-484d-a224-9887887780dc",
              name: "No",
              datatype: "NA",
              answers: {},
              lowAbsolute: null,
              hiAbsolute: null,
              lowNormal: null,
              hiNormal: null,
              unit: null,
              keyValues: {},
              voided: false
            },
            answerOrder: 2,
            abnormal: false,
            unique: false,
            voided: false
          }
        }
      },
      valueJSON: {
        answer: "e7b50c78-3d90-484d-a224-9887887780dc"
      }
    },
    {
      concept: {
        name: "Child has fever",
        datatype: "Coded",
        uuid: "d5bb90bd-f597-4978-8657-15af7c04621b",
        unit: null,
        lowAbsolute: null,
        lowNormal: null,
        hiNormal: null,
        hiAbsolute: null,
        answers: {
          "0": {
            uuid: "a63e277d-af14-4b0d-8fe1-772b3549a7a4",
            concept: {
              uuid: "e7b50c78-3d90-484d-a224-9887887780dc",
              name: "No",
              datatype: "NA",
              answers: {},
              lowAbsolute: null,
              hiAbsolute: null,
              lowNormal: null,
              hiNormal: null,
              unit: null,
              keyValues: {},
              voided: false
            },
            answerOrder: 2,
            abnormal: false,
            unique: false,
            voided: false
          },
          "1": {
            uuid: "ca4813dd-17c9-4e4c-9c1c-8316ad4e02d3",
            concept: {
              uuid: "04bb1773-c353-44a1-a68c-9b448e07ff70",
              name: "Yes",
              datatype: "NA",
              answers: {},
              lowAbsolute: null,
              hiAbsolute: null,
              lowNormal: null,
              hiNormal: null,
              unit: null,
              keyValues: {},
              voided: false
            },
            answerOrder: 1,
            abnormal: false,
            unique: false,
            voided: false
          }
        }
      },
      valueJSON: {
        answer: "e7b50c78-3d90-484d-a224-9887887780dc"
      }
    }
  ]
};
const requestUrl = `/web/rule/api`;

const SubjectDashboard = ({
  match,
  getSubjectProfile,
  subjectProfile,
  getSubjectGeneral,
  subjectGeneral,
  getSubjectProgram,
  subjectProgram,
  getRules,
  rulesData
}) => {
  const classes = useStyles();
  let rules = "no rules";
  const handleProfileMenuOpen = () => {
    getRules(requestUrl, requestBody);
    rules = "show data";
  };

  let paperInfo;
  if (subjectProfile !== undefined) {
    //console.log("rules" + rulesData.data.encounterDecisions[0].value[0]);
    console.log("Rules Json" + JSON.stringify(rulesData));
    //  alert(JSON.stringify(rulesData.data.encounterDecisions[0].value[0]));
    if (rulesData) {
      var txt = JSON.stringify(rulesData);
      var obj = JSON.parse(txt);

      // alert(obj.rulesData.data.encounterDecisions[0].value[0]);
      // console.log(obj.rulesData.data.encounterDecisions[0].value[0]);
    }
    paperInfo = (
      <Paper className={classes.root}>
        <button onClick={handleProfileMenuOpen}>rules</button>
        {/* <div>{JSON.stringify(rulesData.rulesData)}</div> */}
        {/* <div>{`${obj? obj.data.encounterDecisions[0].value[0] : ""}`}</div> */}
        <ProfileDetails
          profileDetails={subjectProfile}
          rules={JSON.stringify(rulesData.rulesData)}
        />
        <SubjectDashboardTabs
          profile={subjectProfile}
          general={subjectGeneral}
          program={subjectProgram}
        />
      </Paper>
    );
  }

  useEffect(() => {
    getSubjectProfile(match.queryParams.uuid);
    getSubjectGeneral(match.queryParams.uuid);
    getSubjectProgram(match.queryParams.uuid);
    // getRules(requestUrl, requestBody);

    //getRules(body);
  }, []);

  return (
    <Fragment>
      <Breadcrumbs path={match.path} />
      {paperInfo}
    </Fragment>
  );
};

const mapStateToProps = state => ({
  subjectProfile: state.dataEntry.subjectProfile.subjectProfile,
  subjectGeneral: state.dataEntry.subjectGenerel.subjectGeneral,
  subjectProgram: state.dataEntry.subjectProgram.subjectProgram,
  rulesData: state.dataEntry.rulesData
});

const mapDispatchToProps = {
  getSubjectProfile,
  getSubjectGeneral,
  getSubjectProgram,
  getRules
};

export default withRouter(
  withParams(
    connect(
      mapStateToProps,
      mapDispatchToProps
    )(SubjectDashboard)
  )
);
