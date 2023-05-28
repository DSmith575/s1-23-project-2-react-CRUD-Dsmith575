/**
 * Component handles API Post
 *
 * File handles Create functionality
 *
 * @file: api.js
 * @version: 1.0.0
 * @author: Deacon Smith <SMITDE5@student.op.ac.nz>
 * @created: 2023-05-27
 * @updated: 2023-05-28
 */

import axios from "axios";

const ApiPost = async (endPoint, formData) => {
  try {
    const response = await axios.post(
      `https://smitde5-rest-api.onrender.com/api/v1/${endPoint}`,
      formData
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export default ApiPost;
