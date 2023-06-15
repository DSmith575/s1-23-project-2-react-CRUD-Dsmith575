/**
 * Component handles API Post
 *
 * File handles Create functionality
 *
 * @file: apiCreate.js
 * @version: 1.0.0
 * @author: Deacon Smith <SMITDE5@student.op.ac.nz>
 * @created: 2023-05-27
 * @updated: 2023-06-04
 */

import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

const ApiPost = async (endPoint, formData) => {
 try {
  const response = await axios.post(`${API_URL}${endPoint}`, formData);
  return response;
 } catch (error) {
  throw error;
 }
};

export default ApiPost;
