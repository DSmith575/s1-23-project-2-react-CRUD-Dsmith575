/**
 * Update character form data
 *
 * Component handles PUT Form Requests
 *
 * @file: updateCharacterForm.js
 * @version: 1.0.0
 * @author: Deacon Smith <SMITDE5@student.op.ac.nz>
 * @created: 2023-04-22
 * @updated: 2023-06-03
 */

import { React, useState, useEffect } from "react";
import axios from "axios";
import { Form } from "reactstrap";
import SubmitButton from "../common/form/submitButton";
import FormDropDown from "../common/form/formDropDown";
import FormTextInput from "../common/form/formTextInput";
import ApiPut from "../services/apiUpdate";

import { affinitySelect } from "../../data/affinitySelect";
import { elementSelection } from "../../data/elementSelection";
import { raritySelection } from "../../data/raritySelection";
import { FormText } from "reactstrap";

const API_URL = process.env.REACT_APP_API_URL;

const CharacterUpdateForm = () => {
  // On loading /update
  // call api and get id and names
  // map names to dropdown
  // once option has been picked
  // load that character data into default values of form
  const [allData, setAllData] = useState([]);
  const [id, setId] = useState(null);
  const [name, setName] = useState("");
  const [affinity, setAffinity] = useState("");
  const [description, setDescription] = useState("");
  const [rarity, setRarity] = useState("");
  const [className, setClassName] = useState("");
  const [element, setElement] = useState("");

  const [message, setMessage] = useState("");
  const [valid, setValid] = useState(false);

  let selectedChar;

  const characterData = {
    name,
    affinity,
    description,
  };

  const elementData = {
    element,
    id,
  };

  const rarityData = {
    rarity,
    className,
    id,
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        //Block runs through the API and checks if it has a nextPage
        //If true increments the page to nextPage num and runs until false
        // This gets all data from the API
        let page = 1;
        let hasNextPage = true;
        let data = [];
        while (hasNextPage) {
          const res = await axios.get(`${API_URL}characters?sortBy=id&page=${page}`);
          const resData = await res.data;

          data = data.concat(resData.data);
          if (resData.nextPage) {
            page = resData.nextPage;
          } else {
            hasNextPage = false;
          }
        }

        setAllData(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const mapAllData = allData.map((item) => ({
    value: item.id,
    label: item.name,
  }));

  const characterForm = (character) => {
    setName(character.name);
    setAffinity(character.affinity);
    setDescription(character.description);
    setElement(character.element.map((e) => e.element));
    setRarity(character.rarity.map((e) => e.rarity));
    setClassName(character.rarity.map((e) => e.className));
  };

  useEffect(() => {
    selectedChar = allData[id - 1]; //Need to start at 0 index
    if (id) {
      characterForm(selectedChar);
    }
  }, [id]);

  useEffect(() => {
    console.log(name);
  }, [name]);

  useEffect(() => {
    const isValid = validate();
    setValid(isValid);
  }, [name, affinity, description, element, rarity, className]);

  const validate = () => {
    // length of values to validate if form is completed
    return (
      name.length &&
      affinity.length &&
      description.length &&
      element.length &&
      rarity.length &&
      className.length
    );
  };

  const HandleSubmit = async (event) => {
    event.preventDefault();
    console.log(characterData);
    console.log(rarityData);
    console.log(elementData);
    try {
      const response = await ApiPut("characters", characterData, id);
      console.log(response);
      if (response.status === 200) {
        console.log(id);
        await ApiPut("elements", elementData, id);
        await ApiPut("rarities", rarityData, id);

        setMessage(response.data.data.msg);
        resetForm();
      }

      // Handle the successful creation of the character
      console.log("Creation successful");
    } catch (error) {
      console.log(error);
      setMessage(error.response.data.msg);
    }
  };

  const resetForm = () => {
    setName("");
    setAffinity("");
    setElement("");
    setDescription("");
    setRarity("");
    setClassName("");
  };

  return (
    <div className="App">
      <h2 style={{ textAlign: "center" }}> Update Character</h2>
      <Form className="form">
        <FormDropDown
          style={{ maxHeight: "200px" }}
          id={"Character List"}
          value={id || ""}
          inputType={"select"}
          set={setId}
          formMap={mapAllData}
        />
      </Form>

      <Form className="form" onSubmit={HandleSubmit}>
        {/* Name */}
        <FormTextInput id={"Name"} value={name} inputType={"text"} set={setName} />

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
          inputType={"select"}
          set={setElement}
          formMap={elementSelection}
        />

        {/* Rarity */}
        <FormDropDown
          id={"Rarity"}
          value={rarity}
          inputType="select"
          set={setRarity}
          formMap={raritySelection}
        />

        {/* Rarity Class name */}
        <FormTextInput
          id={"Class Name"}
          value={className}
          inputType={"text"}
          set={setClassName}
        />

        {/* Description */}
        <FormTextInput
          id={"Description"}
          value={description}
          inputType={"text"}
          set={setDescription}
        />

        <SubmitButton characterData={valid} style={{}} />
        <div style={{ textAlign: "center", fontSize: "20px", fontWeight: "600" }}>
          <p>{message}</p>
        </div>
      </Form>
    </div>
  );
};

export default CharacterUpdateForm;