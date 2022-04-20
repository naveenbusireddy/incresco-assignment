import React, { useState } from "react";
import "./filter.css";

const Filter = (props) => {

  const [filterOptions, setFilterOptions] = useState(props.filterOptions);

  const handleOnChange = (event, index) => {
    let isChecked = event.target.checked;
    if (index !== undefined) {
      let updatedOption = filterOptions.filter((option, i) => i === index)[0];
      let newList = filterOptions;
      updatedOption.isChecked = isChecked;
      newList[index] = updatedOption;
      setFilterOptions(newList);
      let finalSelectedList = JSON.parse(JSON.stringify(newList)).filter((option) => option.isChecked).map((option) => {
        switch (option.id.replace(" ", "")) {
          case "boys": option.id = "Boys"; break;
          case "boysgirls": option.id = "Unisex"; break;
          case "girls": option.id = "Girls"; break;
          case "men": option.id = "Men"; break;
          case "women": option.id = "Women"; break;
          case "menwomen": option.id = "Unisex"; break;
        }
        return option.id;
      });

      let value = {};
      value[props.type] = finalSelectedList.length === 0 ? "selectAll" : finalSelectedList.join(',');
      props.onFilterSelect(value);
    }
    else if (isChecked) {
      let value = {};
      value[props.type] = "selectAll";
      props.onFilterSelect(value);
      let newList = filterOptions.map((option) => { option.isChecked = true; return option });
      setFilterOptions(newList);
    }
    else {
      let value = {};
      value[props.type] = "selectAll";
      props.onFilterSelect(value);
      let newList = filterOptions.map((option) => { option.isChecked = false; return option });
      setFilterOptions(newList);
    }

  }

  return (
    <>
      <strong>{props.type}</strong>
      <li>
        <input
          type="checkbox"
          id={"selectAll" + props.type}
          name={"selectAll" + props.type}
          value={"selectAll" + props.type}
          onChange={(e) => handleOnChange(e)}
        />
        <label htmlFor={"selectAll" + props.type}>Select All/Clear All</label>
      </li>

      {filterOptions && filterOptions.map((option, index) => (
        <li key={option.id}>
          <input
            type="checkbox"
            id={`custom-checkbox-${props.type}-${index}`}
            name={`custom-checkbox-${props.type}-${index}`}
            value={`custom-checkbox-${props.type}-${index}`}
            checked={filterOptions[index].isChecked !== undefined ? filterOptions[index].isChecked : false}
            onChange={(e) => handleOnChange(e, index)}
          />
          <label htmlFor={`custom-checkbox-${props.type}-${index}`}>{option.id}</label>
        </li>
      ))
      }
    </>
  )
}

export default Filter;