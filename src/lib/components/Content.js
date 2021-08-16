import React, { useCallback, useEffect, useMemo, useState } from "react";
import { CONDITION_OPTIONS, INTER_GROUP_OPERATOR, OPERATOR } from "../data";

const Content = ({ setQuery, fieldOptions, criteriaOptions }) => {
  const [queryName, setQueryName] = useState("");
  const [filters, setFilters] = useState([
    {
      operator: "AND",
      fields: [{}],
    },
  ]);

  const fieldData = useMemo(() => {
    return [
      {
        label: "Field",
        options: fieldOptions,
      },
      {
        label: "Condition",
        options: CONDITION_OPTIONS,
      },
      {
        label: "Criteria",
        options: criteriaOptions,
      },
    ];
  }, [criteriaOptions, fieldOptions]);

  const addFilter = useCallback((index) => {
    setFilters((prevValue) => {
      const newValue = [...prevValue];
      newValue[index] = { ...newValue[index] };
      newValue[index].fields = [...newValue[index].fields];
      newValue[index].fields.push({});
      return newValue;
    });
  }, []);

  const addFilterGroup = useCallback(() => {
    setFilters((prevValue) => [
      ...prevValue,
      {
        operator: "AND",
        fields: [{}],
      },
    ]);
  }, []);

  const onSelectChange = useCallback((e, label, index, filterGroupIndex) => {
    setFilters((prevValue) => {
      const newValue = [...prevValue];
      newValue[filterGroupIndex] = { ...newValue[filterGroupIndex] };
      newValue[filterGroupIndex].fields = [
        ...newValue[filterGroupIndex].fields,
      ];
      newValue[filterGroupIndex].fields[index] = {
        ...newValue[filterGroupIndex].fields[index],
        [label]: e.target.value,
      };
      return newValue;
    });
  }, []);

  const onOperatorSelect = useCallback((index, value) => {
    setFilters((prevValue) => {
      const newValue = [...prevValue];
      newValue[index].operator = value;
      return newValue;
    });
  }, []);

  useEffect(() => {
    const query = filters.reduce((acc, val) => {
      return (
        acc +
        val.fields.reduce((fieldAcc, fieldVal, fieldIndex) => {
          let fieldQuery = "";
          for (const key in fieldVal) {
            switch (key) {
              case "Field":
                fieldQuery += `"(${key}.${fieldVal[key]}) `;
                break;
              case "Condition":
                fieldQuery += ` ${OPERATOR[fieldVal[key]]} `;
                break;
              case "Criteria":
                fieldQuery += `\\"${fieldVal[key]})"\\"`;
                break;
              default:
                return "";
            }
          }
          return (
            fieldAcc +
            fieldQuery +
            (fieldIndex !== val.fields.length - 1
              ? INTER_GROUP_OPERATOR[val.operator]
              : "")
          );
        }, "")
      );
    }, "");
    setQuery(query);
  }, [filters, setQuery]);

  return (
    <div className="p-8 overflow-y-hidden">
      <div className="mb-8" style={{ width: "250px" }}>
        <label className="block text-xs mb-2" htmlFor="Tag name">
          Tag name
        </label>
        <input
          id="Tag name"
          type="text"
          value={queryName}
          onChange={(e) => setQueryName(e.target.value)}
          placeholder="e.g Product Feedback"
          className="text-sm outline-none	 bg-opacity-10 bg-white text-opacity-50	text-white py-2 pl-2.5 pr-1 rounded w-full"
        />
      </div>
      <div className="h-4/5 overflow-y-auto">
        {filters.map((filter, index) => {
          return (
            <QueryGroup
              key={index}
              filter={filter}
              addFilter={addFilter}
              index={index}
              onOperatorSelect={onOperatorSelect}
              onSelectChange={(...args) => onSelectChange(...args, index)}
              fieldData={fieldData}
            />
          );
        })}
        <AddFilterGroupButton addFilterGroup={addFilterGroup} />
      </div>
    </div>
  );
};

const QueryGroup = ({
  filter,
  addFilter,
  index,
  onOperatorSelect,
  onSelectChange,
  fieldData,
}) => {
  return (
    <div
      className="block p-4 rounded mb-4"
      style={{ backgroundColor: "#282B30", border: "1px solid #404348" }}
    >
      <ToggleOperator
        index={index}
        onOperatorSelect={onOperatorSelect}
        operator={filter.operator}
      />
      {filter.fields.map((_, index) => (
        <FilterField
          key={index}
          onSelectChange={(...args) => onSelectChange(...args, index)}
          fieldData={fieldData}
        />
      ))}
      <AddFilterButton addFilter={addFilter} index={index} />
    </div>
  );
};

const ToggleOperator = ({ index, onOperatorSelect, operator }) => {
  return (
    <>
      <button
        className="py-1 px-2 rounded-l mb-7"
        style={{
          backgroundColor:
            operator === "AND" ? "#5C61F0" : "rgba(255, 255, 255, 0.05)",
        }}
        onClick={() => onOperatorSelect(index, "AND")}
      >
        AND
      </button>
      <button
        className="py-1 px-2 rounded-r mb-7"
        style={{
          backgroundColor:
            operator === "OR" ? "#5C61F0" : "rgba(255, 255, 255, 0.05)",
        }}
        onClick={() => onOperatorSelect(index, "OR")}
      >
        OR
      </button>
    </>
  );
};

const FilterField = ({ onSelectChange, fieldData }) => {
  console.log(fieldData);
  return (
    <div className="flex mb-4">
      <div className=" flex w-11/12">
        {fieldData?.map(({ label, options }) => {
          return (
            <div className="mr-4 flex-auto" key={label}>
              <label className="block text-xs mb-2	" htmlFor={label}>
                {label}
              </label>
              <select
                className="text-sm outline-none	 bg-opacity-10 bg-white text-opacity-50	text-white py-2 pl-2.5 rounded w-full"
                name={label}
                id={label}
                style={{ border: "1px solid #404348" }}
                defaultValue=""
                onChange={(e) => onSelectChange(e, label)}
              >
                <option value="" disabled hidden>
                  Select {label}
                </option>
                {options.map(({ label, value }) => {
                  return (
                    <option key={label} value={value}>
                      {label}
                    </option>
                  );
                })}
              </select>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const AddFilterButton = ({ addFilter, index }) => {
  return (
    <button
      className="py-2 px-4 rounded-md mt-4"
      style={{ backgroundColor: "#4F46E5" }}
      onClick={() => addFilter(index)}
    >
      + Add filter
    </button>
  );
};

const AddFilterGroupButton = ({ addFilterGroup }) => {
  return (
    <button
      className="py-2 px-4 rounded-md mt-4"
      style={{ backgroundColor: "#4F46E5" }}
      onClick={addFilterGroup}
    >
      + Add new group filter
    </button>
  );
};

export default Content;
