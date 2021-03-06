import React, { Fragment, useState } from "react";
import MaterialTable from "material-table";
import http from "common/utils/httpClient";
import { get, isEmpty, isEqual } from "lodash";
import { Redirect, withRouter } from "react-router-dom";
import Box from "@material-ui/core/Box";
import { Title } from "react-admin";
import { findRegistrationForm } from "../domain/formMapping";
import { useFormMappings } from "./effects";
import { CreateComponent } from "../../common/components/CreateComponent";
import { cloneDeep } from "lodash";

const SubjectTypesList = ({ history }) => {
  const [formMappings, setFormMappings] = useState([]);

  useFormMappings(setFormMappings);

  const columns = [
    {
      title: "Name",
      defaultSort: "asc",
      sorting: false,
      render: rowData => <a href={`#/appDesigner/subjectType/${rowData.id}/show`}>{rowData.name}</a>
    },
    {
      title: "Registration Form",
      field: "formName",
      sorting: false,
      render: rowData => (
        <a
          href={`#/appdesigner/forms/${get(
            findRegistrationForm(formMappings, rowData),
            "formUUID"
          )}`}
        >
          {get(findRegistrationForm(formMappings, rowData), "formName")}
        </a>
      )
    },
    { title: "Household", field: "household", type: "boolean" },
    { title: "Group", field: "group", type: "boolean" },
    { title: "Organisation Id", field: "organisationId", type: "numeric" }
  ];

  const [redirect, setRedirect] = useState(false);

  const tableRef = React.createRef();
  const refreshTable = ref => ref.current && ref.current.onQueryChange();

  const fetchData = query =>
    new Promise(resolve => {
      let apiUrl = "/web/subjectType?";
      apiUrl += "size=" + query.pageSize;
      apiUrl += "&page=" + query.page;
      if (!isEmpty(query.orderBy.field))
        apiUrl += `&sort=${query.orderBy.field},${query.orderDirection}`;
      http
        .get(apiUrl)
        .then(response => response.data)
        .then(result => {
          resolve({
            data: result._embedded ? result._embedded.subjectType : [],
            page: result.page.number,
            totalCount: result.page.totalElements
          });
        });
    });

  const addNewConcept = () => {
    setRedirect(true);
  };

  const editSubjectType = rowData => ({
    icon: "edit",
    tooltip: "Edit subject type",
    onClick: event => history.push(`/appDesigner/subjectType/${rowData.id}`),
    disabled: rowData.voided
  });

  const voidSubjectType = rowData => ({
    icon: "delete_outline",
    tooltip: "Void subject type",
    onClick: (event, rowData) => {
      const voidedMessage = "Do you really want to void the subject type " + rowData.name + " ?";
      if (window.confirm(voidedMessage)) {
        http
          .delete("/web/subjectType/" + rowData.id)
          .then(response => {
            if (response.status === 200) {
              refreshTable(tableRef);
            }
          })
          .catch(error => {});
      }
    }
  });

  const activateSubjectType = rowData => ({
    icon: rowData.active ? "visibility_off" : "visibility",
    tooltip: rowData.active ? "Deactivate subject type" : "Activate subject type",
    onClick: (event, rowData) => {
      const clonedRowData = cloneDeep(rowData);
      clonedRowData.active = !rowData.active;

      http
        .get("/web/operationalModules")
        .then(response => {
          const availableMapping = response.data.formMappings.filter(
            l => l.subjectTypeUUID === rowData.uuid
          );
          const registrationFormUuid = availableMapping.filter(
            l => l.formType === "IndividualProfile"
          );
          clonedRowData["registrationFormUuid"] = !isEmpty(registrationFormUuid)
            ? registrationFormUuid[0].formUUID
            : null;
          if (isEmpty(availableMapping) || isEmpty(registrationFormUuid)) {
            alert("There might be a registration form is missing for this subject type.");
          } else {
            http
              .put("/web/subjectType/" + rowData.id, clonedRowData)
              .then(response => {
                if (response.status === 200) {
                  refreshTable(tableRef);
                }
              })
              .catch(error => {
                console.log(error);
              });
          }
        })
        .catch(error => {});
    }
  });

  return (
    <>
      <Box boxShadow={2} p={3} bgcolor="background.paper">
        <Title title="Subject Types" />

        <div className="container">
          <div>
            <div style={{ float: "right", right: "50px", marginTop: "15px" }}>
              <CreateComponent onSubmit={addNewConcept} name="New Subject type" />
            </div>

            <MaterialTable
              title=""
              components={{
                Container: props => <Fragment>{props.children}</Fragment>
              }}
              tableRef={tableRef}
              columns={columns}
              data={fetchData}
              options={{
                addRowPosition: "first",
                sorting: true,
                debounceInterval: 500,
                search: false,
                rowStyle: rowData => ({
                  backgroundColor: rowData["active"] ? "#fff" : "#DBDBDB"
                })
              }}
              actions={[editSubjectType, voidSubjectType, activateSubjectType]}
            />
          </div>
        </div>
      </Box>
      {redirect && <Redirect to={"/appDesigner/subjectType/create"} />}
    </>
  );
};

function areEqual(prevProps, nextProps) {
  return isEqual(prevProps, nextProps);
}

export default withRouter(React.memo(SubjectTypesList, areEqual));
