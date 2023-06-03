/**
 * Component for dropdown menu on form data
 *
 * Component creates a drop down for the form menu
 *
 * @file: dropDownSelection.js
 * @version: 1.0.0
 * @author: Deacon Smith <SMITDE5@student.op.ac.nz>
 * @created: 2023-05-23
 * @updated: 2023-05-28
 */

import React from "react";

const DropDown = ({ options, onChange }) => {
  return (
    <select onChange={onChange} style={{ marginLeft: "auto", marginRight: "auto" }}>
      <option selected disabled hidden>
        Select
      </option>
      {options.map((option, index) => (
        <option key={index} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default DropDown;
