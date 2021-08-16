const INTER_GROUP_OPERATOR = {
  AND: " && ",
  OR: " || ",
};

const OPERATOR = {
  Equals: "==",
  "Does not equal": "!=",
  Like: "Like",
  "Not like": "Not like",
  "Is Empty": "Is Empty",
  Is: "Is",
  "Is Not": "Is Not",
};

const CONDITION_OPTIONS = [
  {
    value: "Equals",
    label: "Equals",
  },
  {
    value: "Does not equal",
    label: "Does not equal",
  },
  {
    value: "Like",
    label: "Like",
  },
  {
    value: "Not like",
    label: "Not like",
  },
  {
    value: "Is Empty",
    label: "Is Empty",
  },
  {
    value: "Is",
    label: "Is",
  },
  {
    value: "Is Not",
    label: "Is Not",
  },
];

export { CONDITION_OPTIONS, INTER_GROUP_OPERATOR, OPERATOR };
