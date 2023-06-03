/**
 * Form text field
 *
 * Re-usable component for form text field
 *
 * @file: formTextInput.js
 * @version: 1.0.0
 * @author: Deacon Smith <SMITDE5@student.op.ac.nz>
 * @created: 2023-06-03
 * @updated: 2023-06-03
 */

import React from "react";
import { FormGroup, Input, Label } from "reactstrap";

const FormTextInput = ({ id, value, inputType, set }) => {
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
      ></Input>
    </FormGroup>
  );
};

export default FormTextInput;
