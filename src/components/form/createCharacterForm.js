/**
 * Create character form data
 *
 * Component handles Create Form Requests
 *
 * @file: createCharacterForm.js
 * @version: 1.0.0
 * @author: Deacon Smith <SMITDE5@student.op.ac.nz>
 * @created: 2023-04-22
 * @updated: 2023-05-28
 */

import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Dropdown from "./dropDownSelection";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import ApiPost from "../api/api";

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
//Move Submit Button to component
//Set if setElement works without render

const CharacterForm = () => {
  const [name, setName] = useState("");
  const [affinity, setAffinity] = useState("");
  const [description, setDescription] = useState("");
  // const [characterId, setCharacterId] = useState(null);
  // const [rarity, setRarity] = useState([]);
  const [element, setElement] = useState("");
  // const [personality, setPersonality] = useState("");
  // const [attributes, setAttributes] = useState(null);
  let characterId;

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const SubmitButton = ({ characterData }) => {
    if (characterData) {
      return <Button type="submit">Submit</Button>;
    } else {
      return (
        <Button type="submit" disabled={true}>
          Submit
        </Button>
      );
    }
  };

  const HandleSubmit = async (event) => {
    event.preventDefault();
    try {
      const characterData = {
        name,
        affinity,
        description,
      };

      const elementData = {
        element,
        characterId,
      };

      const response = await ApiPost("characters", characterData);
      if (response.status === 201) {
        elementData.characterId = response.data.data.id;
        // console.log(response.data.msg)
        await ApiPost("elements", elementData);

        setMessage(response.data.msg);
      }

      // await axios.post("https://smitde5-rest-api.onrender.com/api/v1/elements",
      // elementData);

      // await axios.post('https://smitde5-rest-api.onrender.com/api/v1/personalities', {
      //     personality,
      //     characterId
      // });

      // await axios.post('https://smitde5-rest-api.onrender.com/api/v1/raritys', {
      //     rarity,
      //     characterId
      // });

      // await axios.post('https://smitde5-rest-api.onrender.com/api/v1/attributes', {
      //     attributes,
      //     characterId
      // });

      // await axios.post('https://smitde5-rest-api.onrender.com/api/v1/affinityBonus', {
      //     affinityBonus,
      //     characterId
      // });

      // Handle the successful creation of the character
      console.log("Creation successful");
    } catch (error) {
      console.log(error);
      setMessage(error.response.data.msg);
    }

    // setName("");
    // setElement("");
    // setAffinity('');
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
        <SubmitButton />
        <div>
          <p>{message}</p>
        </div>
      </Form>
    </div>
  );
};

export default CharacterForm;
