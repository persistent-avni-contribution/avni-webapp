import React, { Fragment, useEffect, useState } from "react";
import MaterialTable from "material-table";
import http from "common/utils/httpClient";
import _, { get } from "lodash";
import { Redirect, withRouter } from "react-router-dom";
import Box from "@material-ui/core/Box";
import { Title } from "react-admin";
import { ShowPrograms, ShowSubjectType } from "../WorkFlow/ShowSubjectType";
import {
  findProgramEncounterCancellationForm,
  findProgramEncounterForm
} from "../domain/formMapping";
import { CreateComponent } from "../../common/components/CreateComponent";
import { cloneDeep } from "lodash";
import { isEmpty } from "lodash";

const EncounterTypeList = ({ history }) => {
  const [redirect, setRedirect] = useState(false);
  const [formMappings, setFormMappings] = useState([]);
  const [subjectTypes, setSubjectTypes] = useState([]);
  const [program, setProgram] = useState([]);
  const [formList, setFormList] = useState([]);

  const tableRef = React.createRef();
  const refreshTable = ref => ref.current && ref.current.onQueryChange();

  useEffect(() => {
    http
      .get("/web/operationalModules")
      .then(response => {
        const formMap = response.data.formMappings;
        formMap.map(l => (l["isVoided"] = false));
        setFormMappings(formMap);
        setSubjectTypes(response.data.subjectTypes);
        setProgram(response.data.programs);
        setFormList(response.data.forms);
      })
      .catch(error => {});
  }, []);

  const columns = [
    {
      title: "Name",
      defaultSort: "asc",
      sorting: false,
      render: rowData => (
        <a href={`#/appDesigner/encounterType/${rowData.id}/show`}>{rowData.name}</a>
      )
    },
    {
      title: "Subject Type",
      sorting: false,
      render: rowData => (
        <ShowSubjectType
          rowDetails={rowData}
          subjectType={subjectTypes}
          formMapping={formMappings}
          setMapping={setFormMappings}
          entityUUID="encounterTypeUUID"
        />
      )
    },
    {
      title: "Programs",
      sorting: false,
      render: rowData => (
        <ShowPrograms
          rowDetails={rowData}
          program={program}
          formMapping={formMappings}
          setMapping={setFormMappings}
        />
      )
    },
    {
      title: "Encounter Form",
      field: "formName",
      sorting: false,
      render: rowData => (
        <a
          href={`#/appdesigner/forms/${get(
            findProgramEncounterForm(formMappings, rowData),
            "formUUID"
          )}`}
        >
          {get(findProgramEncounterForm(formMappings, rowData), "formName")}
        </a>
      )
    },
    {
      title: "Cancellation Form",
      field: "formName",
      sorting: false,
      render: rowData => (
        <a
          href={`#/appdesigner/forms/${get(
            findProgramEncounterCancellationForm(formMappings, rowData),
            "formUUID"
          )}`}
        >
          {get(findProgramEncounterCancellationForm(formMappings, rowData), "formName")}
        </a>
      )
    }
  ];

  const fetchData = query =>
    new Promise(resolve => {
      let apiUrl = "/web/encounterType?";
      apiUrl += "size=" + query.pageSize;
      apiUrl += "&page=" + query.page;
      if (!_.isEmpty(query.orderBy.field))
        apiUrl += `&sort=${query.orderBy.field},${query.orderDirection}`;
      http
        .get(apiUrl)
        .then(response => response.data)
        .then(result => {
          resolve({
            data: result._embedded ? result._embedded.encounterType : [],
            page: result.page.number,
            totalCount: result.page.totalElements
          });
        });
    });

  const addNewConcept = () => {
    setRedirect(true);
  };

  const editEncounterType = rowData => ({
    icon: "edit",
    tooltip: "Edit encounter type",
    onClick: event => history.push(`/appDesigner/encounterType/${rowData.id}`),
    disabled: rowData.voided
  });

  const voidEncounterType = rowData => ({
    icon: "delete_outline",
    tooltip: "Void encounter type",
    onClick: (event, rowData) => {
      const voidedMessage = "Do you really want to void the encounter type " + rowData.name + " ?";
      if (window.confirm(voidedMessage)) {
        http
          .delete("/web/encounterType/" + rowData.id)
          .then(response => {
            if (response.status === 200) {
              refreshTable(tableRef);
            }
          })
          .catch(error => {});
      }
    }
  });

  const activateEncounterType = rowData => ({
    icon: rowData.active ? "visibility_off" : "visibility",
    tooltip: rowData.active ? "Deactivate encounter type" : "Activate encounter type",
    onClick: (event, rowData) => {
      const clonedRowData = cloneDeep(rowData);
      clonedRowData.active = !rowData.active;
      http
        .get("/web/operationalModules")
        .then(response => {
          const availableEntity = response.data.formMappings.filter(
            l => l.encounterTypeUUID === rowData.uuid
          );
          clonedRowData["subjectTypeUuid"] = !isEmpty(availableEntity)
            ? availableEntity[0].subjectTypeUUID
            : null;
          clonedRowData["programUuid"] = !isEmpty(availableEntity)
            ? availableEntity[0].programUUID
            : null;
          let programEncounterFormUuid, programEncounterCancelFormUuid;
          if (clonedRowData.programUuid === undefined) {
            programEncounterFormUuid = availableEntity.filter(l => l.formType === "Encounter");
            clonedRowData["programEncounterFormUuid"] = !isEmpty(programEncounterFormUuid)
              ? programEncounterFormUuid[0].formUUID
              : null;

            programEncounterCancelFormUuid = availableEntity.filter(
              l => l.formType === "IndividualEncounterCancellation"
            );

            clonedRowData["programEncounterCancelFormUuid"] = !isEmpty(
              programEncounterCancelFormUuid
            )
              ? programEncounterCancelFormUuid[0].formUUID
              : null;
          } else {
            programEncounterFormUuid = availableEntity.filter(
              l => l.formType === "ProgramEncounter"
            );
            clonedRowData["programEncounterFormUuid"] = !isEmpty(programEncounterFormUuid)
              ? programEncounterFormUuid[0].formUUID
              : null;

            programEncounterCancelFormUuid = availableEntity.filter(
              l => l.formType === "ProgramEncounterCancellation"
            );

            clonedRowData["programEncounterCancelFormUuid"] = !isEmpty(
              programEncounterCancelFormUuid
            )
              ? programEncounterCancelFormUuid[0].formUUID
              : null;
          }

          if (
            isEmpty(availableEntity) ||
            isEmpty(programEncounterFormUuid) ||
            isEmpty(programEncounterCancelFormUuid)
          ) {
            alert("There might be encounter form or cancellation form is missing.");
          } else {
            http
              .put("/web/encounterType/" + rowData.id, clonedRowData)
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
        <Title title="Encounter Types" />

        <div className="container">
          <div>
            <div style={{ float: "right", right: "50px", marginTop: "15px" }}>
              <CreateComponent onSubmit={addNewConcept} name="New Encounter type" />
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
              actions={[editEncounterType, voidEncounterType, activateEncounterType]}
            />
          </div>
        </div>
      </Box>
      {redirect && <Redirect to={"/appDesigner/encounterType/create"} />}
    </>
  );
};

export default withRouter(EncounterTypeList);
