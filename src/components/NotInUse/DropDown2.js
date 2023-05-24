import { Button, Form, FormGroup, Input, Label } from "reactstrap";

const Dropdown2 = () => {
  {
    return (
      <div className="App">
        <h2>Create</h2>
        <Form className="form" onSubmit={handleSubmit}>
          <FormGroup>
            <Label for="">Name</Label>
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label for="">Affinity</Label>
            <Dropdown options={options} />
            <Label for="">Element</Label>
            <Dropdown options={elementSelection} />
            <Label for="">Description</Label>
            <Input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </FormGroup>
          <Button>Submit</Button>
        </Form>
      </div>
    );
  }
};

export default Dropdown2;
