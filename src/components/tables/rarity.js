/**
 * Handles displaying rarity table in browser
 *
 * @file: rarity.js
 * @version: 1.0.0
 * @author: Deacon Smith <SMITDE5@student.op.ac.nz>
 * @created: 2023-06-03
 * @updated: 2023-06-16
 */

import { Table } from "reactstrap";
import { useState, useEffect } from "react";
import ApiGet from "../services/apiGet";

const Rarities = () => {
 const [data, setData] = useState([]);

 useEffect(() => {
  const fetchData = async () => {
   try {
    setData(await ApiGet("rarities"));
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
     <th>Rarity</th>
     <th>Class</th>
    </tr>
   </thead>
   <tbody>
    {data.map((d) => (
     <tr key={d.id}>
      <td>{d.characterId}</td>
      <td>{d.character.name}</td>
      <td>{d.rarity}</td>
      <td>{d.className}</td>
     </tr>
    ))}
   </tbody>
  </Table>
 ) : (
  <h2 style={{ textAlign: "center" }}>NoData</h2>
 );
};

export default Rarities;
