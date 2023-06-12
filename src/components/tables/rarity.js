/**
 * Rarity table
 *
 * Handles displaying rarity table in browser
 *
 * @file: rarity.js
 * @version: 1.0.0
 * @author: Deacon Smith <SMITDE5@student.op.ac.nz>
 * @created: 2023-06-03
 * @updated: 2023-06-03
 */

import { Table } from "reactstrap";
import axios from "axios";
import { useState, useEffect } from "react";

const Rarities = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `https://smitde5-rest-api.onrender.com/api/v1/rarities?sortBy=id&sortOrder=desc`
        );
        setData(res.data.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  return data && data.length > 0 ? (
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
    <h2>No Data</h2>
  );
};

export default Rarities;
