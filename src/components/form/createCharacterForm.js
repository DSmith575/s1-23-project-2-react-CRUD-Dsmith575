/**
 * Create character form data
 *
 * Component handles Create Form Requests
 *
 * @file: createCharacterForm.js
 * @version: 1.0.0
 * @author: Deacon Smith <SMITDE5@student.op.ac.nz>
 * @created: 2023-04-22
 * @updated: 2023-05-29
 */

import React, { useEffect, useState, useRef } from "react";
import Dropdown from "./dropDownSelection";
import { Form, FormGroup, Input, Label } from "reactstrap";
import ApiPost from "../services/apiCreate";
import SubmitButton from "./submitButton";

const affinitySelect = [
  { value: "Light", label: "Light" },
  { value: "Shadow", label: "Shadow" },
];

const elementSelection = [
  { value: "None", label: "None" },
  { value: "Fire", label: "Fire" },
  { value: "Water", label: "Water" },
  { value: "Earth", label: "Earth" },
  { value: "Wind", label: "Wind" },
  { value: "Thunder", label: "Thunder" },
  { value: "Shade", label: "Shade" },
  { value: "Crystal", label: "Crystal" },
];

//TODO
//Set if setElement works without render

const CharacterForm = () => {
  const [name, setName] = useState("");
  const [affinity, setAffinity] = useState("");
  const [description, setDescription] = useState("");
  // const [rarity, setRarity] = useState([]);
  const [element, setElement] = useState("");
  // const [personality, setPersonality] = useState("");
  // const [attributes, setAttributes] = useState(null);

  let characterId;
  //submit button validation
  const [valid, setValid] = useState(false);

  const characterData = {
    name,
    affinity,
    description,
  };

  const elementData = {
    element,
    characterId,
  };

  const [message, setMessage] = useState("");

  useEffect(() => {
    const isValid = validate();
    setValid(isValid);
  }, [name, affinity, description, element]);

  const validate = () => {
    // return name.length && affinity.length && description.length
    return name.length && affinity.length && description.length && element.length;
  };

  const HandleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await ApiPost("characters", characterData);
      if (response.status === 201) {
        elementData.characterId = response.data.data.id;
        await ApiPost("elements", elementData);

        setMessage(response.data.msg);

        setName("");
        setElement();
      }

      // Handle the successful creation of the character
      console.log("Creation successful");
    } catch (error) {
      console.log(error);
      setMessage(error.response.data.msg);
    }
  };

  return (
    <div className="App">
      <h2 style={{ textAlign: "center" }}>Create Character</h2>
      <Form className="form" onSubmit={HandleSubmit}>
        <FormGroup>
          <Label for="">Name</Label>
          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </FormGroup>

        <FormGroup style={{}}>
          <Label for="">Affinity</Label>
          <Dropdown
            options={affinitySelect}
            value="Light"
            onChange={(e) => setAffinity(e.target.value)}
          />
        </FormGroup>

        <FormGroup>
          <Label for="">Element</Label>
          <Dropdown
            options={elementSelection}
            onChange={(e) => setElement(e.target.value)}
          />
        </FormGroup>

        {/* <FormGroup>
          <Label>Element</Label>
          <Input type="select">
            <DropDown
              options={elementSelection}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Input>
        </FormGroup> */}

        <FormGroup>
          <Label for="">Description</Label>
          <Input type="text" onChange={(e) => setDescription(e.target.value)} />
        </FormGroup>
        <SubmitButton characterData={valid} />
        <div>
          <p>{message}</p>
        </div>
      </Form>
    </div>
  );
};

export default CharacterForm;
