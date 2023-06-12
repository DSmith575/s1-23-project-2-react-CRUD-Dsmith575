/**
 * Update character form data
 *
 * Component handles PUT Form Requests
 *
 * @file: updateCharacterForm.js
 * @version: 1.0.0
 * @author: Deacon Smith <SMITDE5@student.op.ac.nz>
 * @created: 2023-04-22
 * @updated: 2023-06-13
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

const API_URL = process.env.REACT_APP_API_URL;

const CharacterUpdateForm = () => {
  const [allData, setAllData] = useState([]);
  const [characterId, setCharacterId] = useState(null);
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
    element: element.toString(), //Converting to string for put request
    characterId: characterId,
  };

  const rarityData = {
    rarity: parseInt(rarity), //Converting to int for put request
    className: className.toString(), //converting to string for put requet
    characterId,
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
    value: item?.id || "",
    label: item?.name || "",
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
    selectedChar = allData[characterId - 1]; //Need to start at 0 index
    if (characterId) {
      characterForm(selectedChar);
    }
  }, [characterId]);

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
      className.length &&
      // CHECK THISVVVVVVVVVVVVVVV
      characterId > 0
    );
  };

  const HandleSubmit = async (event) => {
    event.preventDefault();
    console.log(characterData);
    console.log(rarityData);
    console.log(elementData);

    try {
      const response = await ApiPut("characters", characterData, characterId);
      console.log(response);
      if (response.status === 200) {
        console.log(elementData.element);
        await ApiPut("elements", elementData, characterId);
        await ApiPut("rarities", rarityData, characterId);
        console.log(response.data.msg);
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

  useEffect(() => {
    console.log(typeof elementData.characterId);
  }, [name]);

  return (
    <div className="App">
      {allData.length > 0 ? (
        <>
          <h2 style={{ textAlign: "center" }}> Update Character</h2>
          <Form className="form">
            <FormDropDown
              style={{ maxHeight: "200px" }}
              id={"Character List"}
              value={characterId || ""}
              inputType={"select"}
              set={setCharacterId}
              formMap={mapAllData}
            />
          </Form>

          <Form className="form" onSubmit={HandleSubmit}>
            {/* Name */}
            <FormTextInput
              id={"Name"}
              value={name}
              inputType={"text"}
              set={setName}
            />

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
            <div
              style={{ textAlign: "center", fontSize: "20px", fontWeight: "600" }}
            >
              <p>{message}</p>
            </div>
          </Form>
        </>
      ) : (
        <h2 style={{ textAlign: "center" }}>NoData</h2>
      )}
    </div>
  );
};

export default CharacterUpdateForm;
