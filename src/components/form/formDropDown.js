import React from "react";
import { FormGroup, Input, Label } from "reactstrap";

const FormDropDown = ({ id, value, inputType, set, formMap }) => {
  const handleChange = (e) => {
    set(e.target.value);
  };

  return (
    <FormGroup>
      <Label for={`${id}Form`}>{id}</Label>
      <Input
        id={`${id}Form`}
        type={inputType}
        name={`${id}Name`}
        onChange={handleChange}
        value={value}
      >
        <option value={""} disabled>
          Select
        </option>
        {formMap.map((item) => (
          <option key={item.value} value={item.value}>
            {item.label}
          </option>
        ))}
      </Input>
    </FormGroup>
  );
};

export default FormDropDown;
