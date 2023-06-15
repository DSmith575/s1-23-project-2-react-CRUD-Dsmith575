/**
 * Update character form data
 *
 * Component handles PUT Form Requests
 *
 * @file: updateCharacterForm.js
 * @version: 1.0.0
 * @author: Deacon Smith <SMITDE5@student.op.ac.nz>
 * @created: 2023-04-22
 * @updated: 2023-06-16
 */

import { React, useState, useEffect } from "react";
import { Form } from "reactstrap";
import SubmitButton from "../common/form/submitButton";
import FormDropDown from "../common/form/formDropDown";
import FormTextInput from "../common/form/formTextInput";
import ApiPut from "../services/apiUpdate";
import ApiGet from "../services/apiGet";

import { affinitySelect } from "../../data/affinitySelect";
import { elementSelection } from "../../data/elementSelection";
import { raritySelection } from "../../data/raritySelection";

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
  className: className.toString(), //converting to string for put request
  characterId,
 };

 useEffect(() => {
  const fetchData = async () => {
   try {
    setAllData(await ApiGet("characters"));
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

 //Query through the mapAllData and check if value is === characterId
 //Then if that succeeds, use that value for the selected ID
 //This is to stop out of bounds erroring if there is only one piece of data left int the API
 // Also stops out of bounds when using first attempt of allData[characterID -1] which worked when IDs were structured with no deletes
 useEffect(() => {
  if (characterId) {
   const selectedCharacter = mapAllData.find(
    (item) => item.value === parseInt(characterId)
   );

   if (selectedCharacter) {
    const updatedSelectedChar = allData.find(
     (item) => item.id === selectedCharacter.value
    );
    characterForm(updatedSelectedChar);
   }
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
   characterId > 0
  );
 };

 const HandleSubmit = async (event) => {
  event.preventDefault();

  try {
   const response = await ApiPut("characters", characterData, characterId);
   if (response.status === 200) {
    setMessage(response.data.msg);
    await ApiPut("elements", elementData, characterId);
    await ApiPut("rarities", rarityData, characterId);
   }
   resetForm();
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
  setCharacterId(0);
 };

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
       buttonType={"Select"}
      />
     </Form>

     <Form className="form" onSubmit={HandleSubmit}>
      {/* Name */}
      <FormTextInput
       id={"Name"}
       value={name}
       inputType={"text"}
       set={setName}
       buttonType={"Select"}
      />

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
       inputType={"select"}
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

      <SubmitButton characterData={valid} buttonType={"Update"} style={{}} />
      <div style={{ textAlign: "center", fontSize: "20px", fontWeight: "600" }}>
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
