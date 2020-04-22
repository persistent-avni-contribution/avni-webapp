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

const useStyle = makeStyles(theme => ({
  form: {
    padding: theme.spacing(4, 3)
  },
  table: {
    width: "67%",
    border: "1px solid lightgray"
  }
}));

const Summary = ({ observations, subject, getRules, rulesData }) => {
  const classes = useStyle();
  const { t } = useTranslation();

  console.log("Subject ************" + subject);

  const requestUrl = `web/decisionrule`;
  const requestBody = {
    uuid: "35253eab-6594-4bad-9243-ca6ef15fc054",
    firstName: "amol",
    lastName: "nirmal",
    dateOfBirth: "1994-01-12",
    gender: "Male",
    addressLevel: "Taka",
    registrationDate: "2020-01-12",
    lowestAddressLevel: "Wadigodri, Taka, Taka",
    isVoided: false,
    observations: [
      {
        concept: {
          name: "Marital status",
          uuid: "aa6687c9-ba4d-49a3-9b3e-bba266eb6f32",
          dataType: "Coded"
        },
        value: [
          {
            name: "General",
            uuid: "cae99772-b389-4baf-849b-9c7c2b06c951",
            dataType: "NA"
          },
          {
            name: "Currently married",
            uuid: "9832ccec-edd6-4fa2-96b1-f81832df3996",
            dataType: "NA"
          }
        ]
      },
      {
        concept: {
          name: "Caste Category",
          uuid: "61ab6413-5c6a-4512-ab6e-7d5cd1439569",
          dataType: "Coded"
        },
        value: {
          name: "General",
          uuid: "cae99772-b389-4baf-849b-9c7c2b06c951",
          dataType: "NA"
        }
      },
      {
        concept: {
          name: "Number of household members (eating together)",
          uuid: "25b73ca1-e268-452f-ba05-2595af28ac04",
          dataType: "Numeric"
        },
        value: 5
      },
      {
        concept: {
          name: "Ration Card",
          uuid: "476a0b71-485b-4a0a-ba6f-4f3cf13568ca",
          dataType: "Coded",
          answers: {
            "0": {
              concept: {
                uuid: "04bb1773-c353-44a1-a68c-9b448e07ff70",
                name: "Yes",
                datatype: "NA"
              },
              uuid: "b0ef4333-5d9a-4f4a-83e6-81b1503b4039"
            },
            "1": {
              concept: {
                uuid: "e7b50c78-3d90-484d-a224-9887887780dc",
                name: "No",
                datatype: "NA"
              },
              uuid: "6e1bad13-a896-4783-8f27-97e2e6780c58"
            }
          }
        },
        value: {
          name: "Yes",
          uuid: "04bb1773-c353-44a1-a68c-9b448e07ff70",
          dataType: "NA"
        }
      },
      {
        concept: {
          name: "Baby has got diarrohea",
          uuid: "d7ae84be-0642-4e46-9d91-699574082abb",
          dataType: "Coded",
          answers: {
            "0": {
              concept: {
                uuid: "04bb1773-c353-44a1-a68c-9b448e07ff70",
                name: "Yes",
                datatype: "NA"
              },
              uuid: "b0ef4333-5d9a-4f4a-83e6-81b1503b4039"
            },
            "1": {
              concept: {
                uuid: "e7b50c78-3d90-484d-a224-9887887780dc",
                name: "No",
                datatype: "NA"
              },
              uuid: "6e1bad13-a896-4783-8f27-97e2e6780c58"
            }
          }
        },
        value: {
          name: "Yes",
          uuid: "04bb1773-c353-44a1-a68c-9b448e07ff70",
          dataType: "NA"
        }
      },
      {
        concept: {
          name: "Occupation",
          uuid: "cd83afec-d147-42b2-bd50-0ca460dbd55f",
          dataType: "Coded"
        },
        value: {
          name: "Professional/Technical",
          uuid: "aab5a52c-38b9-472b-a90e-3e63022c5a96",
          dataType: "NA"
        }
      },
      {
        concept: {
          name: "Relation to head of the family",
          uuid: "1b6ae290-1823-4aab-91a5-b1d8a1b3b837",
          dataType: "Coded"
        },
        value: {
          name: "Self",
          uuid: "74466f64-3f7c-4046-aaae-57803cee46b1",
          dataType: "NA"
        }
      },
      {
        concept: {
          name: "Religion",
          uuid: "c922c13c-1fa2-42dd-a7e8-d234b0324870",
          dataType: "Coded"
        },
        value: {
          name: "Hindu",
          uuid: "5f1f8a86-478b-4e7b-ae5e-ac7b207e65b8",
          dataType: "NA"
        }
      },
      {
        concept: {
          name: "Status of the individual",
          uuid: "6617408e-b89e-4f2f-ab10-d818c5d7f1bd",
          dataType: "Coded"
        },
        value: {
          name: "Resident",
          uuid: "6a85071d-201a-414d-8f25-4e9957053634",
          dataType: "NA"
        }
      },
      {
        concept: {
          name: "Whether sterilized",
          uuid: "92475d77-7cdd-4976-98f0-3847939a95d1",
          dataType: "Coded"
        },
        value: {
          name: "No",
          uuid: "e7b50c78-3d90-484d-a224-9887887780dc",
          dataType: "NA"
        }
      }
    ],
    rule: {
      uuid: "36ba19a3-c289-44b7-bf56-eed36e9d7519",
      ruleType: "Decision"
    }
  };

  useEffect(() => {
    console.log("get ********");
    getRules(requestUrl, requestBody);
  }, []);

  console.log("#################" + JSON.stringify(rulesData));

  return rulesData.rules ? (
    <div className={classes.form}>
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
  subject: state.dataEntry.subject
});

const mapDispatchToProps = {
  getRules
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
