/**
 * Create character form data
 *
 * Component handles POST Form Requests
 *
 * @file: deleteCharacterForm.js
 * @version: 1.0.0
 * @author: Deacon Smith <SMITDE5@student.op.ac.nz>
 * @created: 2023-06-13
 * @updated: 2023-06-13
 */

import { React, useState, useEffect } from "react";
import axios from "axios";
import { Form } from "reactstrap";
import SubmitButton from "../common/form/submitButton";
import FormDropDown from "../common/form/formDropDown";
import FormTextInput from "../common/form/formTextInput";
import ApiDelete from "../services/apiDelete";

const API_URL = process.env.REACT_APP_API_URL;

const CharacterDelete = () => {
  const [allData, setAllData] = useState([]);
  const [characterId, setCharacterId] = useState(null);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [valid, setValid] = useState(false);

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
  };

  useEffect(() => {
    if (characterId) {
      const updatedSelectedChar = allData[characterId - 1];
      characterForm(updatedSelectedChar);
      console.log(characterId);
    }
  }, [characterId]);

  const validate = () => {
    // length of values to validate if form is completed
    return name.length && characterId > 0;
  };

  useEffect(() => {
    const isValid = validate();
    setValid(isValid);
  }, [name, characterId]);

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
          console.log(response.data.msg);
          setMessage(response.data.msg);
        }
      } catch (err) {
        console.log(err);
      }
    }
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

export default CharacterDelete;
