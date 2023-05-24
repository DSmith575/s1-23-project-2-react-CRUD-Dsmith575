import { Button, Form, FormGroup, Input, Label } from "reactstrap";

const Test = () => {
  {
    return (
      <div className="App">
        <h2>Sign In</h2>
        <Form className="form">
          <FormGroup>
            <Label for="exampleEmail">Name</Label>
            <Input
              type="email"
              name="email"
              id="exampleEmail"
              placeholder="example@example.com"
            />
            <Label for="examplePassword">Password</Label>
            <Input
              type="password"
              name="password"
              id="examplePassword"
              placeholder="********"
            />
          </FormGroup>
          <Button type="submit">Submit</Button>
        </Form>
      </div>
    );
  }
};

export default Test;
