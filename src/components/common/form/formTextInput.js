/**
 * Re-usable component for form text field
 *
 * @file: formTextInput.js
 * @version: 1.0.0
 * @author: Deacon Smith <SMITDE5@student.op.ac.nz>
 * @created: 2023-06-03
 * @updated: 2023-06-16
 */

import React from "react";
import { FormGroup, Input, Label } from "reactstrap";

const FormTextInput = ({ id, value, inputType, set, disableOption }) => {
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
    disabled={disableOption}
   ></Input>
  </FormGroup>
 );
};

export default FormTextInput;
