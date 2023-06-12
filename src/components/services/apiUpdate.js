/**
 * Component handles API Put
 *
 * File handles Update functionality
 *
 * @file: apiUpdate.js
 * @version: 1.0.0
 * @author: Deacon Smith <SMITDE5@student.op.ac.nz>
 * @created: 2023-06-04
 * @updated: 2023-06-03
 */

import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

const ApiPut = async (endPoint, formData, characterId) => {
  try {
    const response = await axios.put(
      `${API_URL}${endPoint}/${parseInt(characterId)}`,
      formData
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export default ApiPut;
