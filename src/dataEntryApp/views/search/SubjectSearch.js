import React, { useEffect } from "react";
import Table from "@material-ui/core/Table";
import { withRouter, Link } from "react-router-dom";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { first } from "lodash";
import { setSubjectSearchParams, searchSubjects } from "../../reducers/searchReducer";
import RegistrationMenu from "./RegistrationMenu";
import PrimaryButton from "../../components/PrimaryButton";
import Paper from "@material-ui/core/Paper";
import { useTranslation } from "react-i18next";

const useStyle = makeStyles(theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing(3),
    overflowX: "auto"
  },
  table: {
    minWidth: 1000
  },
  searchCreateToolbar: {
    display: "flex"
  },
  searchForm: {
    marginLeft: theme.spacing(3),
    marginBottom: theme.spacing(8),
    display: "flex",
    alignItems: "flex-end",
    flex: 8
  },
  searchFormItem: {
    margin: theme.spacing(1)
  },
  createButtonHolder: {
    flex: 1
  },
  searchBox: {
    padding: "1.5rem",
    margin: "2rem 1rem"
  }
}));

const SubjectsTable = ({ type, subjects }) => {
  const classes = useStyle();
  const { t } = useTranslation();

  return (
    <Table className={classes.table}>
      <TableHead>
        <TableRow>
          <TableCell>{t("name")}</TableCell>
          {type.name === "Individual" && <TableCell align="center">{t("gender")}</TableCell>}
          {type.name === "Individual" && <TableCell align="center">{t("dateOfBirth")}</TableCell>}
          <TableCell align="center">{t("location")}</TableCell>
          <TableCell align="center">{t("activeprograms")}</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {subjects.map((row, id) => (
          <TableRow key={id}>
            <TableCell component="th" scope="row">
              <Link to={`/app/subject?uuid=${row.uuid}`}>{row.fullName}</Link>
            </TableCell>
            {type.name === "Individual" && (
              <TableCell align="center">{row.gender ? t(row.gender.name) : ""}</TableCell>
            )}
            {type.name === "Individual" && <TableCell align="center">{row.dateOfBirth}</TableCell>}
            <TableCell align="center">
              {row.addressLevel ? row.addressLevel.titleLineage : ""}
            </TableCell>
            <TableCell align="center">
              {row.activePrograms.map((p, key) => (
                <Button
                  key={key}
                  size="small"
                  style={{
                    height: 20,
                    padding: 0,
                    backgroundColor: p.colour,
                    color: "white"
                  }}
                  disabled
                >
                  {t(p.operationalProgramName)}
                </Button>
              ))}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

const SubjectSearch = props => {
  const classes = useStyle();
  const { t } = useTranslation();

  const handleSubmit = event => {
    event.preventDefault();
    props.search();
  };

  useEffect(() => {
    props.search();
  }, []);

  return (
    <Paper className={classes.searchBox}>
      <div className={classes.searchCreateToolbar}>
        <form onSubmit={handleSubmit} className={classes.searchForm}>
          <FormControl className={classes.searchFormItem}>
            <InputLabel htmlFor="search-field">{""}</InputLabel>
            <Input
              id="search-field"
              autoFocus
              type="text"
              value={props.searchParams.query}
              onChange={e => props.setSearchParams({ query: e.target.value })}
            />
          </FormControl>
          <FormControl className={classes.searchFormItem}>
            <PrimaryButton type={"submit"} onClick={handleSubmit}>
              {t("search")}
            </PrimaryButton>
          </FormControl>
        </form>
        <RegistrationMenu className={classes.createButtonHolder} />
      </div>
      <SubjectsTable subjects={props.subjects} type={props.subjectType} />
    </Paper>
  );
};

const mapStateToProps = state => {
  return {
    user: state.app.user,
    subjects: state.dataEntry.search.subjects,
    searchParams: state.dataEntry.search.subjectSearchParams,
    subjectType: first(state.dataEntry.metadata.operationalModules.subjectTypes)
  };
};

const mapDispatchToProps = {
  search: searchSubjects,
  setSearchParams: setSubjectSearchParams
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(SubjectSearch)
);
