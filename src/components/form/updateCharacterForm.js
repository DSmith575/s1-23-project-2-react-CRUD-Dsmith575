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

import { affinitySelect } from "../../data/affinitySelect";
import { elementSelection } from "../../data/elementSelection";
import { raritySelection } from "../../data/raritySelection";

const API_URL = process.env.REACT_APP_API_URL;

const CharacterUpdateForm = () => {
  // On loading /update
  // call api and get id and names
  // map names to dropdown
  // once option has been picked
  // load that character data into default values of form
  const [allData, setAllData] = useState([]);
  const [id, setId] = useState(null);
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
  // const [message, setMessage] = useState("");
  // const [name, setName] = useState("");
  // const [affinity, setAffinity] = useState("");
  // const [description, setDescription] = useState("");
  // const [rarity, setRarity] = useState("");
  // const [className, setClassName] = useState("");
  // const [element, setElement] = useState("");

  // let characterId;

  // const [valid, setValid] = useState(false);

  // const resetForm = () => {
  //     setName("");
  //     setAffinity("");
  //     setElement("");
  //     setDescription("");
  //     setRarity("");
  //     setClassName("");
  //   };

  //   const characterData = {
  //     name,
  //     affinity,
  //     description,
  //   };

  //   const elementData = {
  //     element,
  //     characterId,
  //   };

  //   const rarityData = {
  //     rarity,
  //     className,
  //     characterId,
  //   };

  //Testing
  //   useEffect(() => {
  //     console.log();
  //   }, []);

  // Validation: If length >0, field is considered to have a value inside it
  //   useEffect(() => {
  //     const isValid = validate();
  //     setValid(isValid);
  //   }, [name, affinity, description, element, rarity, className]);

  //   const validate = () => {
  // length of values to validate if form is completed
  //     return (
  //       name.length &&
  //       affinity.length &&
  //       description.length &&
  //       element.length &&
  //       rarity.length &&
  //       className.length
  //     );
  //   };

  return (
    <div className="App">
      <h2 style={{ textAlign: "center" }}> Update Character</h2>
      <Form className="form" onSubmit={""}>
        <FormDropDown
          id={"updateSelection"}
          value={id}
          inputType={"select"}
          set={setId}
          formMap={mapAllData}
        />
        {/* Name */}
        {/* <FormTextInput id={"Name"} value={name} inputType={"text"} set={setName} /> */}

        {/* <SubmitButton characterData={valid} style={{}} /> */}
        {/* <div style={{ textAlign: "center", fontSize: "20px", fontWeight: "600" }}>
          <p>{message}</p>
        </div> */}
      </Form>
      {console.log(id)}
    </div>
    // <div>
    //     {allData.map((item) => (
    //         <p key={item.id}>{item.name}</p>
    //     ))}
    // </div>
  );
};

export default CharacterUpdateForm;
