import React from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";
import { bold } from "ansi-colors";
import { Route, Link, Switch, BrowserRouter as Router, withRouter, Redirect} from "react-router-dom";
import SubjectDashboardTabs from "./SubjectDashboardTabs";
import SubjectDashboard from "../SubjectDashboard";


const useStyles = makeStyles(theme => ({
  card: {
    boxShadow: "0px 0px 0px 0px",
    borderRadius: "0"
  },
  rightBorder: {
    borderRight: "1px solid rgba(0,0,0,0.12)",
    "&:nth-child(4n),&:last-child": {
      borderRight: "0px solid rgba(0,0,0,0.12)"
    },
    marginTop: "15px"
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
  }
}));

const GridCommonList = ({ gridListDetails, path,
  subjectProfile,
  }) => {
  console.log(gridListDetails, path, subjectProfile );
  const classes = useStyles();
  return (
    <Grid item xs={12} container className={classes.gridBottomBorder}>
      {gridListDetails
        ? gridListDetails.map(relative => {
            if (relative !== undefined) {
              return (
                <Grid item xs={3} className={classes.rightBorder}>
                  <Card className={classes.card}>
                    <CardContent>
                      <Typography component={"div"} color="primary">
                      <Router>
                      <Link to={`#${path}?uuid=${relative.individualBUuid}`} >
                              {relative.firstName + " " + relative.lastName}
                      </Link>

                      <Switch>
                          <Route
                            exact
                            path={`#${path}?uuid=${relative.individualBUuid}`}
                            component={SubjectDashboard}
                          >
                          </Route>
                          
                        </Switch>
                      </Router>
                      {/* <a href="#/app/subject?uuid=8c66190c-5e1a-491a-932f-2710ee63ed83">  {relative.firstName + " " + relative.lastName} </a> */}
                      </Typography>
                      <Typography
                        component={"span"}
                        className={classes.title}
                        color="textSecondary"
                        gutterBottom
                      >
                        {relative.individualBIsToARelation}
                      </Typography>
                      <Typography
                        component={"span"}
                        className={classes.title}
                        color="textSecondary"
                        gutterBottom
                      >
                        {new Date().getFullYear() -
                          new Date(relative.dateOfBirth).getFullYear() +
                          " Year"}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button color="primary">REMOVE</Button>
                      <Button color="primary">EDIT</Button>
                    </CardActions>
                  </Card>
                </Grid>
              );
            } else {
              return "";
            }
          })
        : ""}
    </Grid>
  );
};

export default withRouter(GridCommonList);
