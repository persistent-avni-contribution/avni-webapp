import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { bold } from "ansi-colors";
import moment from "moment/moment";
import Observations from "../../../../common/components/Observations";
import GridCommonList from "../components/GridCommonList";
import { Paper } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import { InternalLink } from "../../../../common/components/utils";

const useStyles = makeStyles(theme => ({
  expansionHeading: {
    fontSize: "1rem",
    flexBasis: "33.33%",
    flexShrink: 0,
    fontWeight: "500",
    margin: "0"
  },
  expansionSecondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary
  },
  root: {
    flexGrow: 1,
    padding: theme.spacing(2),
    boxShadow: "0px 0px 4px 1px rgba(0,0,0,0.3)"
  },
  expansionSubHeading: {
    fontSize: theme.typography.pxToRem(13),
    flexBasis: "33.33%",
    flexShrink: 0,
    fontWeight: "400",
    margin: "0"
  },
  listItemView: {
    border: "1px solid lightGrey"
  },
  expansionPanel: {
    marginBottom: "11px",
    borderRadius: "5px",
    boxShadow:
      "0px 0px 3px 1px rgba(0,0,0,0.2), 0px 1px 2px 0px rgba(0,0,0,0.14), 0px 2px 1px -1px rgba(0,0,0,0.12)"
  },
  card: {
    boxShadow: "0px 0px 0px 0px rgba(0,0,0,0.12)",
    borderRight: "1px solid rgba(0,0,0,0.12)",
    borderRadius: "0"
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    fontSize: 14
  },
  headingBold: {
    fontWeight: bold
  },
  gridBottomBorder: {
    borderBottom: "1px solid rgba(0,0,0,0.12)",
    paddingBottom: "10px"
  },
  infomsg: {
    marginLeft: 10
  },
  expandMoreIcon: {
    color: "#0e6eff"
  }
}));

const SubjectDashboardProfileTab = ({ profile, path, enableReadOnly }) => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <Fragment>
      <Paper className={classes.root}>
        <ExpansionPanel className={classes.expansionPanel}>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon className={classes.expandMoreIcon} />}
            aria-controls="registrationPanelbh-content"
            id="registrationPanelbh-header"
          >
            <Typography component={"span"}>
              <p className={classes.expansionHeading}>{t("registrationDetails")}</p>
              <p className={classes.expansionSubHeading}>
                {t("registrationDate")}:{" "}
                {moment(new Date(profile.registrationDate)).format("DD-MM-YYYY")}
              </p>
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Grid item xs={12}>
              <List>
                <Observations observations={profile ? profile.observations : ""} />
              </List>
              {!enableReadOnly ? <Button color="primary">{t("void")}</Button> : ""}
              {/* <Button color="primary">{t("edit")}</Button> */}
              {!enableReadOnly ? (
                <Button color="primary">
                  <InternalLink to={`/app/editSubject?uuid=${profile.uuid}`}>
                    {t("edit")}{" "}
                  </InternalLink>
                </Button>
              ) : (
                ""
              )}
            </Grid>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel className={classes.expansionPanel}>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon className={classes.expandMoreIcon} />}
            aria-controls="relativesPanelbh-content"
            id="relativesPanelbh-header"
          >
            <Typography component={"span"} className={classes.expansionHeading}>
              {t("Relatives")}
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails style={{ paddingTop: "0px" }}>
            {profile.relationships != undefined ? (
              <GridCommonList
                gridListDetails={profile.relationships}
                enableReadOnly={enableReadOnly}
              />
            ) : (
              <Typography variant="caption" gutterBottom className={classes.infomsg}>
                {" "}
                {t("noRelativesAdded")}{" "}
              </Typography>
            )}
          </ExpansionPanelDetails>
          {!enableReadOnly ? <Button color="primary"> {t("addARelative")}</Button> : ""}
        </ExpansionPanel>
      </Paper>
    </Fragment>
  );
};

export default SubjectDashboardProfileTab;
