import React, { Fragment } from "react";
import { isNaN } from "lodash";
import { withParams } from "../../../common/components/utils";
import Paginator from "../../components/Paginator";
import { withRouter, Redirect } from "react-router-dom";
import { makeStyles } from "@material-ui/styles";
import { LineBreak } from "../../../common/components/utils";
import moment from "moment/moment";
import Form from "../../components/Form";
import Summary from './Summary';
import { Box, Typography, Paper } from "@material-ui/core";
import CustomizedDialog from "../../components/Dialog";

const useStyle = makeStyles(theme => ({
  form: {
    padding: theme.spacing(0, 3, 4, 3),
    height:600,
    border: "1px solid #f1ebeb",
    position:"relative"
  },
  detailsstyle: {
    color:"#000",
    fontSize:"bold"
  },
  details: {   
    color: "rgba(0, 0, 0, 0.54)",
    backgroundColor:"#f8f4f4",
    height:40,
    width:"100%",  
    padding: 8,
    marginBottom: 10
  },
  buttomstyle : {
    position: "absolute",
    bottom: 0,
    left: 0,    
    backgroundColor: "#f8f4f4",
    height: 80,
    width: '100%',
    padding: 25
  }
}));


const Header = ({ subject }) => {
  const classes = useStyle();
  const fullName = subject.firstName + " " + subject.lastName || "-";
  const gender = subject.gender.name || "-";
  const lowestAddressLevel = subject.lowestAddressLevel.title || "-";
  const dateOfBirth = moment().diff(subject.dateOfBirth, "years") + "yrs" || "-";
  return (   
      <div className={classes.details}>
        <Typography variant="caption" gutterBottom>
          Name:  <Typography className={classes.detailsstyle} variant="caption" gutterBottom>{fullName}</Typography> | Age: <Typography className={classes.detailsstyle} variant="caption" gutterBottom>{dateOfBirth}</Typography> | Gender: <Typography className={classes.detailsstyle} variant="caption" gutterBottom>{gender}</Typography> | Village: <Typography className={classes.detailsstyle} variant="caption" gutterBottom>{lowestAddressLevel}</Typography>
        </Typography>
        <LineBreak num={2}></LineBreak> 
      </div>    
  )
};

const SubjectRegistrationForm = ({ form, obs, updateObs, location, title, match, saved, onSaveGoto, onSave, subject, onLoad }) => {
  React.useEffect(()=>{
    if(!subject){
      onLoad(match.queryParams.type);
    }
  })  
  const classes = useStyle();
  const [redirect, setRedirect] = React.useState(false);

  const page = +match.queryParams.page;
  const from = match.queryParams.from;

  const firstPageNumber = form && form.firstFormElementGroup.displayOrder;
  const currentPageNumber = isNaN(page) ? firstPageNumber : page;
  const lastPageNumber = form && form.getLastFormElementElementGroup().displayOrder;

  const pageDetails = {
    nextPageNumber:
      currentPageNumber === lastPageNumber
        ? null
        : form && form.getNextFormElement(currentPageNumber).displayOrder,
    previousPageNumber:
      currentPageNumber === firstPageNumber
        ? null
        : form && form.getPrevFormElement(currentPageNumber).displayOrder,
    location,
    from
  };

  const current = form && form.formElementGroupAt(currentPageNumber);
  const pageCount = (currentPageNumber+1) + " / " + (lastPageNumber+1);

  const onOkHandler = (data) =>{setRedirect(data)}

  return (
    <Fragment>    
      {form && <div>
        <Header subject={subject}></Header>
      <Box display="flex" flexDirection={"row"} flexWrap="wrap" justifyContent="space-between">
        <Typography variant="subtitle1" gutterBottom>  {currentPageNumber + 1}. {current.name} </Typography>       
          <Paginator pageDetails={pageDetails} 
          onSave={onSave}
          label={{Previous:"PREV",Next:"NEXT",Save:"SAVE",type:"text"}}
          showCount="true"
          count={pageCount}/>               
      </Box>      
      <Paper className={classes.form}>
        {(currentPageNumber === lastPageNumber) ? <Summary subject={subject} /> :
          <Form current={current} obs={obs} updateObs={updateObs}></Form>}

        {saved && <CustomizedDialog 
        showSuccessIcon="true"
        message="Your details have been successfully registered."
        showOkbtn="true"
        openDialogContainer={true}
        onOk = {onOkHandler}
        />}
        {saved && redirect && <Redirect to={onSaveGoto} />}
        <div className={classes.buttomstyle}>
        <Paginator pageDetails={pageDetails}
         onSave={onSave}
         label={{Previous:"PREVIOUS",Next:"NEXT",Save:"SAVE"}}
         showCount="false"/>
        </div>
        
      </Paper></div>}
   </Fragment>
  );
}

export default withRouter(withParams(SubjectRegistrationForm));