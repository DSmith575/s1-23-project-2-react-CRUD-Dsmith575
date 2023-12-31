/**
 * Create character form data
 *
 * Component handles POST Form Requests
 *
 * @file: createCharacterForm.js
 * @version: 1.0.0
 * @author: Deacon Smith <SMITDE5@student.op.ac.nz>
 * @created: 2023-04-22
 * @updated: 2023-06-16
 */

import React, { useEffect, useState } from "react";
import { Form } from "reactstrap";
import ApiPost from "../services/apiCreate.js";
import SubmitButton from "../common/form/submitButton.js";
import FormDropDown from "../common/form/formDropDown.js";
import FormTextInput from "../common/form/formTextInput.js";

import { affinitySelect } from "../../data/affinitySelect.js";
import { elementSelection } from "../../data/elementSelection.js";
import { raritySelection } from "../../data/raritySelection.js";

const CharacterForm = () => {
 const [message, setMessage] = useState("");
 const [name, setName] = useState("");
 const [affinity, setAffinity] = useState("");
 const [description, setDescription] = useState("");
 const [rarity, setRarity] = useState("");
 const [className, setClassName] = useState("");
 const [element, setElement] = useState("");

 //Used to POST the rest of fields after character is posted
 //This does not need to be reactive as it is not displayed to the user
 let characterId;

 //submit button validation, submit button greyed out till all fields are filled in
 const [valid, setValid] = useState(false);

 const resetForm = () => {
  setName("");
  setAffinity("");
  setElement("");
  setDescription("");
  setRarity("");
  setClassName("");
 };

 //dataObj fields for POST
 const characterData = {
  name,
  affinity,
  description,
 };

 const elementData = {
  element,
  characterId,
 };

 const rarityData = {
  rarity,
  className,
  characterId,
 };

 // Validation: If length >0, field is considered to have a value inside it
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
  try {
   const response = await ApiPost("characters", characterData);
   if (response.status === 201) {
    elementData.characterId = response.data.data.id;
    rarityData.characterId = response.data.data.id;
    await ApiPost("elements", elementData);
    await ApiPost("rarities", rarityData);

    setMessage(response.data.msg);
    resetForm();
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
    {/* Name */}
    <FormTextInput id={"Name"} value={name} inputType={"text"} set={setName} />

    {/* Affinity */}
    <FormDropDown
     id={"Affinity"}
     value={affinity}
     inputType={"select"}
     set={setAffinity}
     formMap={affinitySelect}
     buttonType={"Select"}
    />

    {/* Element */}
    <FormDropDown
     id={"Element"}
     value={element}
     inputType="select"
     set={setElement}
     formMap={elementSelection}
     buttonType={"Select"}
    />

    {/* Rarity */}
    <FormDropDown
     id={"Rarity"}
     value={rarity}
     inputType={"select"}
     set={setRarity}
     formMap={raritySelection}
     buttonType={"Select"}
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

    <SubmitButton characterData={valid} buttonText={"Create"} style={{}} />
    <div style={{ textAlign: "center", fontSize: "20px", fontWeight: "600" }}>
     <p>{message}</p>
    </div>
   </Form>
  </div>
 );
};

export default CharacterForm;
