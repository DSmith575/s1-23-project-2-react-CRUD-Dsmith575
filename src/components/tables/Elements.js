/**
 * Handles displaying element table in browser
 *
 * @file: elements.js
 * @version: 1.0.0
 * @author: Deacon Smith <SMITDE5@student.op.ac.nz>
 * @created: 2023-05-21
 * @updated: 2023-06-16
 */

import { Table } from "reactstrap";
import { useState, useEffect } from "react";
import ApiGet from "../services/apiGet";

const Elements = () => {
 const [data, setData] = useState([]);

 useEffect(() => {
  const fetchData = async () => {
   try {
    setData(await ApiGet("elements"));
   } catch (err) {
    console.log(err);
   }
  };
  fetchData();
 }, []);

 return data.length > 0 ? (
  <Table hover bordered>
   <thead>
    <tr>
     <th>ID</th>
     <th>Name</th>
     <th>Element</th>
    </tr>
   </thead>
   <tbody>
    {data.map((e) => (
     <tr key={e.id}>
      <td>{e.id}</td>
      <td>{e.character.name}</td>
      <td>{e.element}</td>
     </tr>
    ))}
   </tbody>
  </Table>
 ) : (
  <h2 style={{ textAlign: "center" }}>NoData</h2>
 );
};

export default Elements;
