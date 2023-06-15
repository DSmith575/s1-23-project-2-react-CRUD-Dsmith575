/**
 * Character table
 *
 * Handles displaying character table in browser
 *
 * @file: character.js
 * @version: 1.0.0
 * @author: Deacon Smith <SMITDE5@student.op.ac.nz>
 * @created: 2023-05-21
 * @updated: 2023-06-16
 */

import { Table } from "reactstrap";
import { useState, useEffect } from "react";
import ApiGet from "../services/apiGet";

const Characters = () => {
 const [data, setData] = useState([]);

 useEffect(() => {
  const fetchData = async () => {
   try {
    setData(await ApiGet("characters"));
   } catch (err) {
    console.log(err);
   }
  };
  fetchData();
 }, []);

 if (data) {
  return (
   <Table hover bordered style={{ textAlign: "center" }}>
    {console.log(data.length)}
    <thead>
     <tr>
      <th>ID</th>
      <th>Name</th>
      <th>Element</th>
      <th>Rarity</th>
      <th>Class Name</th>
      <th>Affinity</th>
      <th>Description</th>
     </tr>
    </thead>
    <tbody>
     {data.map((d) => (
      <tr key={d.id} style={{ justifyContent: "center" }}>
       <td>{d.id}</td>
       <td>{d.name}</td>
       <td>{d.element.element}</td>
       <td>{d.rarity.map((e) => e.rarity)}</td>
       <td>{d.rarity.map((e) => e.className)}</td>
       <td>{d.affinity}</td>
       <td>{d.description}</td>
      </tr>
     ))}
    </tbody>
   </Table>
  );
 } else {
  return <h2 style={{ textAlign: "center" }}>NoData</h2>;
 }
};

export default Characters;
