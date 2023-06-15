/**
 * Component handles API Get

 * @file: apiCreate.js
 * @version: 1.0.0
 * @author: Deacon Smith <SMITDE5@student.op.ac.nz>
 * @created: 2023-06-16
 * @updated: 2023-06-16
 */

import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

const ApiGet = async (endPoint) => {
 try {
  //Block runs through the API and checks if it has a nextPage
  //If true increments the page to nextPage num and runs until false
  // This gets all data from the API
  let page = 1;
  let hasNextPage = true;
  let data = [];

  while (hasNextPage) {
   const response = await axios.get(`${API_URL}${endPoint}?sortBy=id&page=${page}`);
   const resData = response.data;

   data = data.concat(resData.data);

   if (data === undefined) {
    break;
   }

   console.log(data);

   if (!resData.nextPage === null) {
    page = resData.nextPage;
   } else {
    hasNextPage = false;
   }
  }

  return data;
 } catch (error) {
  throw error;
 }
};

export default ApiGet;
