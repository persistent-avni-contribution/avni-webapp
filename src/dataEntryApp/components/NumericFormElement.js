import React, { Fragment } from "react";
import { TextField } from "@material-ui/core";
import { isNaN, isEmpty, find } from "lodash";
import { useTranslation } from "react-i18next";

export default ({ formElement: fe, value, update, validationResults, uuid }) => {
  const { t } = useTranslation();
  const validationResult = find(
    validationResults,
    validationResult => validationResult.formIdentifier === uuid
  );

  return (
    <Fragment>
      <TextField
        label={t(fe.display || fe.name)}
        type={"numeric"}
        autoComplete="off"
        required={fe.mandatory}
        name={fe.name}
        value={isNaN(parseInt(value)) ? undefined : value}
        style={{ width: "30%" }}
        helperText={validationResult && t(validationResult.messageKey)}
        error={validationResult && !validationResult.success}
        onChange={e => {
          const v = e.target.value;
          isEmpty(v) ? update(null) : update(parseInt(v));
        }}
      />
    </Fragment>
  );
};
