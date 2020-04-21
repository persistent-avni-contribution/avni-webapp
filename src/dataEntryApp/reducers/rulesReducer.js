// const prefix = "app/dataEntry/reducer/subjectProfile";
const prefix = "app/dataEntry/reducer/rulesData";
export const types = {
  GET_RULES: `${prefix}GET_RULES`,
  SET_RULES: `${prefix}SET_RULES`
};
export const getRules = (reqUrl, reqBody) => ({
  type: types.GET_RULES,
  reqUrl,
  reqBody
});

export const setRules = rulesData => ({
  type: types.SET_RULES,
  rulesData
});

export default function(state = {}, action) {
  switch (action.type) {
    case types.SET_RULES: {
      return {
        ...state,
        rules: action.rulesData
      };
    }
    default:
      return state;
  }
}
