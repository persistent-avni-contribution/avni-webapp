import React from "react";
import { LineBreak } from "../../common/components";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Radio,
  TextField
} from "@material-ui/core";
import { includes, invoke } from "lodash";

export const Form = ({ children: form, obs, updateObs }) => {
  const current = form.formElementGroups[0];
  return (
    <div>
      <FormElementGroup key={current.id} obs={obs} updateObs={updateObs}>
        {current}
      </FormElementGroup>
    </div>
  );
};

export const FormElementGroup = ({ children: feg, obs, updateObs }) => {
  return (
    <div>
      <h4>{feg.name}</h4>
      <LineBreak num={1} />
      {feg.formElements.map(fe => (
        <FormElement
          key={fe.id}
          concept={fe.concept}
          value={invoke(
            obs.find(o => o.concept.uuid === fe.concept.uuid),
            "getValue"
          )}
          update={updateObs}
        >
          {fe}
        </FormElement>
      ))}
      <LineBreak num={1} />
    </div>
  );
};

export const FormElement = ({ children: fe, concept, value, update }) => {
  return (
    <div>
      <LineBreak num={1} />
      {fe.getType() === "Text" && (
        <TextField
          label={fe.display || fe.name}
          type={"text"}
          required={fe.mandatory}
          name={fe.name}
          value={value}
          onChange={e => update(e.target.value)}
        />
      )}
      {fe.getType() === "SingleSelect" && (
        <CodedConceptFormElement
          isChecked={answer => value === answer.uuid}
          onChange={update}
        >
          {fe}
        </CodedConceptFormElement>
      )}
      {fe.getType() === "MultiSelect" && (
        <CodedConceptFormElement
          isChecked={answer => includes(value, answer.uuid)}
          onChange={update}
        >
          {fe}
        </CodedConceptFormElement>
      )}
      <LineBreak num={1} />
    </div>
  );
};

export const CodedConceptFormElement = ({ children: fe, ...props }) => {
  return (
    <CodedFormElement
      groupName={fe.name}
      items={fe.concept.answers}
      multiSelect={fe.type === "MultiSelect"}
      {...props}
    />
  );
};

export const CodedFormElement = ({
  groupName,
  items,
  isChecked,
  onChange,
  multiSelect,
  ...props
}) => {
  return (
    <FormControl component="fieldset" {...props}>
      <FormLabel component="legend">{groupName}</FormLabel>
      <FormGroup>
        {items.map(item => (
          <FormControlLabel
            key={item.uuid}
            control={
              multiSelect ? (
                <Checkbox
                  checked={isChecked(item)}
                  onChange={() => onChange(item)}
                  value={item.uuid}
                />
              ) : (
                <Radio
                  checked={isChecked(item)}
                  onChange={() => onChange(item)}
                  value={item.uuid}
                />
              )
            }
            label={item.name}
          />
        ))}
      </FormGroup>
    </FormControl>
  );
};
