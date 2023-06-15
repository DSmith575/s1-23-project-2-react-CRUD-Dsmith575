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

const SubmitButton = ({ characterData, buttonType }) => {
 if (characterData) {
  return (
   <Button type="submit" style={{ backgroundColor: "green" }}>
    {buttonType}
   </Button>
  );
 } else {
  return (
   <Button type="submit" disabled={true}>
    {buttonType}
   </Button>
  );
 }
};

export default SubmitButton;
