/**
 * Reusable submit button
 *
 * @file: submitButton.js
 * @version: 1.0.0
 * @author: Deacon Smith <SMITDE5@student.op.ac.nz>
 * @created: 2023-04-22
 * @updated: 2023-06-16
 */

import { Button } from "reactstrap";

const SubmitButton = ({ characterData, buttonText }) => {
 if (characterData) {
  return (
   <Button type="submit" style={{ backgroundColor: "green" }}>
    {buttonText}
   </Button>
  );
 } else {
  return (
   <Button type="submit" disabled={true}>
    {buttonText}
   </Button>
  );
 }
};

export default SubmitButton;
