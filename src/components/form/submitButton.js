import { Button } from "reactstrap";

const SubmitButton = ({ characterData }) => {
  if (characterData) {
    return (
      <Button type="submit" style={{ backgroundColor: "green" }}>
        Submit
      </Button>
    );
  } else {
    return (
      <Button type="submit" disabled={true}>
        Submit
      </Button>
    );
  }
};

export default SubmitButton;
