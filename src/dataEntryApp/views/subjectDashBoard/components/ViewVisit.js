import React, { Fragment, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Breadcrumbs from "dataEntryApp/components/Breadcrumbs";
import { getViewVisit } from "../../../reducers/viewVisitReducer";
import { types } from "../../../reducers/completedVisitsReducer";
import { withRouter, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { withParams } from "common/components/utils";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Observations from "common/components/Observations";
import Button from "@material-ui/core/Button";
import { InternalLink } from "../../../../common/components/utils";
import moment from "moment/moment";
import { useTranslation } from "react-i18next";
import { store } from "../../../../common/store/createStore";

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2),
    margin: theme.spacing(1, 3),
    flexGrow: 1,
    boxShadow:
      "0px 0px 3px 0px rgba(0,0,0,0.4), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 2px 1px -1px rgba(0,0,0,0.12)"
  },
  innerPaper: {
    padding: theme.spacing(2, 2),
    margin: theme.spacing(1, 1),
    flexGrow: 1,
    boxShadow:
      "0px 0px 3px 0px rgba(0,0,0,0.4), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 2px 1px -1px rgba(0,0,0,0.12)"
  },
  mainHeading: {
    fontSize: "1.5vw",
    fontWeight: "bold"
  },
  scheduledHeading: {
    fontSize: "1vw",
    fontWeight: "300"
  },
  subHeading: {
    fontSize: "1vw",
    fontWeight: "bold"
  },
  programStatusStyle: {
    color: "green",
    backgroundColor: "#36fb85a8",
    fontSize: "15px",
    padding: theme.spacing(0.6, 0.6),
    margin: theme.spacing(1, 1)
  }
}));

const ViewVisit = ({ match, getViewVisit, viewVisit, enrolldata }) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const history = useHistory();
  let localSavedEnrollment;
  store.dispatch({ type: types.ADD_ENROLLDATA, value: enrolldata });

  useEffect(() => {
    getViewVisit(match.queryParams.uuid);
  }, []);

  return viewVisit ? (
    <Fragment>
      <Breadcrumbs path={match.path} />
      <Paper className={classes.root}>
        <Grid container direction="row" justify="space-between" alignItems="baseline">
          <Typography component={"span"} className={classes.mainHeading}>
            {t("ViewVisit")} {t(viewVisit.encounterType.name)}
          </Typography>
          {viewVisit.earliestVisitDateTime ? (
            <Typography component={"span"} className={classes.scheduledHeading}>
              {t("Scheduledon")}{" "}
              {`${moment(new Date(viewVisit.earliestVisitDateTime)).format("DD-MM-YYYY")}`}
            </Typography>
          ) : (
            ""
          )}
        </Grid>

        <Typography component={"span"} className={classes.programStatusStyle}>
          {t("Completed")}
        </Typography>
        <Typography component={"span"} className={classes.subHeading}>
          {`${moment(new Date(viewVisit.encounterDateTime)).format("DD-MM-YYYY")}`}
        </Typography>

        <Paper className={classes.innerPaper}>
          <Typography component={"span"} className={classes.subHeading}>
            {t("summary")}
          </Typography>

          <Observations observations={viewVisit ? viewVisit.observations : ""} />
        </Paper>
        <Button color="primary">
          <InternalLink to={`/app/subject/completedVisits?id=${enrolldata.enrollmentId}`}>
            {t("viewAllCompletedVisit")}
          </InternalLink>
        </Button>
        <Button color="primary" onClick={() => history.goBack()}>
          {t("back")}
        </Button>
      </Paper>
    </Fragment>
  ) : (
    ""
  );
};

const mapStateToProps = state => ({
  viewVisit: state.dataEntry.viewVisitReducer.viewVisits,
  enrolldata: state.dataEntry.completedVisitsReducer.enrolldata
});

const mapDispatchToProps = {
  getViewVisit
};

export default withRouter(
  withParams(
    connect(
      mapStateToProps,
      mapDispatchToProps
    )(ViewVisit)
  )
);