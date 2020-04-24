import { isNil } from "lodash";
import React from "react";
import { CodedConceptFormElement } from "./CodedConceptFormElement";
import { MultipleCodedValues } from "avni-models";

export default ({ formElement: fe, update, obsHolder }) => {
  const getSelectedAnswer = (concept, nullReplacement) => {
    const observation = obsHolder.findObservation(concept);
    return isNil(observation) ? nullReplacement : observation.getValueWrapper();
  };
  const valueWrapper = getSelectedAnswer(fe.concept, new MultipleCodedValues());
  return (
    <CodedConceptFormElement
      isChecked={answer => {
        const answerAlreadyPresent = valueWrapper.isAnswerAlreadyPresent(answer.uuid);
        return answerAlreadyPresent;
      }}
      onChange={answer => update(answer.uuid)}
    >
      {fe}
    </CodedConceptFormElement>
  );
};
