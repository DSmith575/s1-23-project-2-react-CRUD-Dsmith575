/**
 * Component handles API Put
 *
 * File handles Update functionality
 *
 * @file: apiDelete.js
 * @version: 1.0.0
 * @author: Deacon Smith <SMITDE5@student.op.ac.nz>
 * @created: 2023-06-04
 * @updated: 2023-06-03
 */

import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

const ApiDelete = async (endPoint, characterId) => {
 try {
  const response = await axios.delete(`${API_URL}${endPoint}/${characterId}`);
  return response;
 } catch (error) {
  throw error;
 }
};

export default ApiDelete;
