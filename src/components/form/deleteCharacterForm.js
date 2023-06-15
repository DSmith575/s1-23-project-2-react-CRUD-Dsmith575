/**
 * Delete character form data
 *
 * Component handles DELETE Form Requests
 *
 * @file: deleteCharacterForm.js
 * @version: 1.0.0
 * @author: Deacon Smith <SMITDE5@student.op.ac.nz>
 * @created: 2023-06-13
 * @updated: 2023-06-16
 */

import { React, useState, useEffect } from "react";
import { Form } from "reactstrap";
import SubmitButton from "../common/form/submitButton";
import FormDropDown from "../common/form/formDropDown";
import FormTextInput from "../common/form/formTextInput";
import ApiDelete from "../services/apiDelete";
import ApiGet from "../services/apiGet";

const CharacterDelete = () => {
 const [allData, setAllData] = useState([]);
 const [characterId, setCharacterId] = useState(null);
 const [name, setName] = useState("");
 const [message, setMessage] = useState("");
 const [valid, setValid] = useState(false);

 const mapAllData = allData.map((item) => ({
  value: item?.id || "",
  label: item?.name || "",
 }));

 const characterForm = (character) => {
  setName(character.name);
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

 const HandleSubmit = async (event) => {
  event.preventDefault();
  const confirmation = window.confirm(`Delete ${name} data?`);
  if (!confirmation) {
   alert("Cancelled");
   return;
  } else {
   try {
    const response = await ApiDelete("rarities", characterId);
    console.log(response);
    if (response.status === 200) {
     await ApiDelete("elements", characterId);
     await ApiDelete("characters", characterId);
     setMessage(`Character with the ID: ${characterId} deleted`);
     resetForm();
    }
   } catch (err) {
    console.log(err);
   }
  }
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

 const validate = () => {
  // length of values to validate if form is completed
  return name.length && characterId > 0;
 };

 useEffect(() => {
  const isValid = validate();
  setValid(isValid);
 }, [name, characterId]);

 const resetForm = () => {
  setCharacterId("");
  setName("");
 };

 return (
  <div className="App">
   {allData.length > 0 ? (
    <>
     <h2 style={{ textAlign: "center" }}> Delete Character</h2>
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
       disableOption={true}
      />

      <SubmitButton characterData={valid} buttonType={"Delete"} style={{}} />
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

export default CharacterDelete;
