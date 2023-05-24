import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Dropdown from "./DropDown";

import { Button, Form, FormGroup, Input, Label } from "reactstrap";

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

let characterId;

const CharacterForm = () => {
  const [name, setName] = useState("");
  const [affinity, setAffinity] = useState("");
  const [description, setDescription] = useState("");
  // const [characterId, setCharacterId] = useState(null);
  // const [rarity, setRarity] = useState([]);
  const [element, setElement] = useState("");
  // const [personality, setPersonality] = useState("");
  // const [attributes, setAttributes] = useState(null);

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const characterData = {
        name,
        affinity,
        description,
      };

      const response = await axios.post(
        "https://smitde5-rest-api.onrender.com/api/v1/characters/",
        characterData
      );

      if (response.status === 201) {
        //  setMessage(response.data.msg);
        characterId = response.data.data.id;
      }

      await axios.post("https://smitde5-rest-api.onrender.com/api/v1/elements", {
        element,
        characterId,
      });

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
      setMessage(message);

      console.log("Creation successful");
    } catch (err) {
      if (error.response) {
        setError(error.response.data.error);
        console.error(error);
      }
    }

    // setName("");
    // setElement("");
    // setAffinity('');
  };

  return (
    <div className="App">
      <h2>Create Character</h2>
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
          <Dropdown
            options={affinitySelect}
            onChange={(e) => setAffinity(e.target.value)}
          />
          <Label for="">Element</Label>
          <Dropdown
            options={elementSelection}
            onChange={(e) => setElement(e.target.value)}
          />
        </FormGroup>

        <FormGroup>
          <Label for="">Description</Label>
          <Input type="text" onChange={(e) => setDescription(e.target.value)} />
        </FormGroup>
        <Button type="submit">Submit</Button>
      </Form>
    </div>
  );
};

export default CharacterForm;
