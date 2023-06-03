/**
 * Create character form data
 *
 * Component handles Create Form Requests
 *
 * @file: createCharacterForm.js
 * @version: 1.0.0
 * @author: Deacon Smith <SMITDE5@student.op.ac.nz>
 * @created: 2023-04-22
 * @updated: 2023-06-03
 */

import React, { useEffect, useState, useRef } from "react";
import { Form, FormGroup, Input, Label } from "reactstrap";
import ApiPost from "../services/apiCreate";
import SubmitButton from "./submitButton";
import FormDropDown from "./formDropDown";

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

const CharacterForm = () => {
  const [message, setMessage] = useState("");
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

  useEffect(() => {
    console.log(affinity);
  }, [affinity]);

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
        setAffinity("");
        setElement("");
        setDescription("");
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

        {/* Affinity */}
        <FormDropDown
          id={"Affinity"}
          value={affinity}
          inputType={"select"}
          set={setAffinity}
          formMap={affinitySelect}
        />

        {/* Element */}
        <FormDropDown
          id={"Element"}
          value={element}
          inputType="select"
          set={setElement}
          formMap={elementSelection}
        />

        {/* <FormGroup>
          <Label for="affinityForm">Affinity</Label>
          <Input
            id="affinityForm"
            type="select"
            name="affSelect"
            onChange={(e) => setAffinity(e.target.value)}
            value={affinity}
          >
            <option value={""} disabled>
              Select
            </option>
            {affinitySelect.map((affinity) => (
              <option key={affinity.value} value={affinity.value}>
                {affinity.label}
              </option>
            ))}
          </Input>
        </FormGroup> */}

        {/* <FormGroup>
          <Label for="elementForm">Element</Label>
          <Input
            id="elementForm"
            type="select"
            name="eleSelect"
            onChange={(e) => setElement(e.target.value)}
            value={element}
          >
            <option value={""} disabled>
              Select
            </option>
            {elementSelection.map((element) => (
              <option key={element.value} value={element.value}>
                {element.label}
              </option>
            ))}
          </Input>
        </FormGroup> */}

        <FormGroup>
          <Label for="descripForm">Description</Label>
          <Input
            id="descripForm"
            type="text"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </FormGroup>
        <SubmitButton characterData={valid} style={{}} />
        <div style={{ textAlign: "center", fontSize: "20px", fontWeight: "600" }}>
          <p>{message}</p>
        </div>
      </Form>
    </div>
  );
};

export default CharacterForm;
