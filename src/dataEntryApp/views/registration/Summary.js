import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Table, TableBody, TableCell, TableRow, Typography, List, Grid } from "@material-ui/core";
import Observations from "../../../common/components/Observations";
import { LineBreak } from "../../../common/components/utils";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { withParams } from "../../../common/components/utils";
import { getRules } from "../../reducers/rulesReducer";

import Loading from "../../components/Loading";
import BrowserStore from "../../api/browserStore";

import {
  getRegistrationForm,
  onLoad,
  saveSubject,
  updateObs,
  updateSubject,
  setSubject,
  saveCompleteFalse
} from "../../reducers/registrationReducer";
import { disableSession } from "common/constants";

const useStyle = makeStyles(theme => ({
  form: {
    padding: theme.spacing(4, 3)
  },
  table: {
    width: "67%",
    border: "1px solid lightgray"
  }
}));

const Summary = ({ observations, form, getRules, rulesData }) => {
  const classes = useStyle();
  const { t } = useTranslation();
  const requestUrl = `web/decisionrule`;
  useEffect(() => {
    let requestBody;
    if (disableSession) {
      let subject = BrowserStore.fetchSubject();
      console.log("Subject ########", subject.toResource);
      let body = subject.toResource;
      body.rule = {
        uuid: form.uuid,
        ruleType: "Decision",
        workFlow: "Individual"
      };
      requestBody = body;
      console.log("requestbody####" + JSON.stringify(requestBody));
    }

    getRules(requestUrl, requestBody);
  }, []);

  console.log("#################" + JSON.stringify(rulesData));

  return rulesData.rules ? (
    <div className={classes.form}>
      {rulesData.rules.data.registrationDecisions.filter(rule => rule.value.lenght >= 0)}

      <Typography variant="button" display="block" gutterBottom>
        {t("SYSTEM RECOMMENDATIONS")}
      </Typography>
      <Table className={classes.table} aria-label="simple table">
        <TableBody>
          {rulesData.rules &&
            rulesData.rules.data.registrationDecisions.map(rules => (
              <TableRow>
                <TableCell align="justify">{rules.name}</TableCell>
                <TableCell align="justify">{rules.value[0]}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>

      <LineBreak num={2} />
      <Typography variant="button" display="block" gutterBottom>
        {t("OBSERVATIONS")}
      </Typography>
      <Grid item xs={8}>
        <List>
          <Observations observations={observations ? observations : ""} />
        </List>
      </Grid>
    </div>
  ) : (
    <Loading />
  );
};
const mapStateToProps = state => ({
  rulesData: state.dataEntry.rules,
  subject: state.dataEntry.registration.subject
});

const mapDispatchToProps = {
  getRules,
  onLoad,
  setSubject,
  saveCompleteFalse
};

export default withRouter(
  withParams(
    connect(
      mapStateToProps,
      mapDispatchToProps
    )(Summary)
  )
);
// export default Summary;
