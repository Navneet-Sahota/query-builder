import QueryBuilder from "./lib";

function App() {
  return (
    <QueryBuilder
      fieldOptions={FIELD_OPTIONS}
      criteriaOptions={CRITERIA_OPTIONS}
      onClose={() => {}}
      onSubmit={() => {}}
    />
  );
}

export default App;

const FIELD_OPTIONS = [
  {
    value: "Theme",
    label: "Theme",
  },
  {
    value: "Sub-theme",
    label: "Sub-theme",
  },
  {
    value: "Language",
    label: "Language",
  },
  {
    value: "Reason",
    label: "Reason",
  },
  {
    value: "Source",
    label: "Source",
  },
  {
    value: "Rating",
    label: "Rating",
  },
  {
    value: "Time Period",
    label: "Time Period",
  },
];

const CRITERIA_OPTIONS = [
  {
    value: "Offers",
    label: "Offers",
  },
  {
    value: "Performance",
    label: "Performance",
  },
  {
    value: "Product Feedback",
    label: "Product Feedback",
  },
  {
    value: "Platform",
    label: "Platform",
  },
];
