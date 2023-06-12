/**
 * Character table
 *
 * Handles displaying character table in browser
 *
 * @file: character.js
 * @version: 1.0.0
 * @author: Deacon Smith <SMITDE5@student.op.ac.nz>
 * @created: 2023-05-21
 * @updated: 2023-05-28
 */

import { Table } from "reactstrap";
import axios from "axios";
import { useState, useEffect } from "react";

const API_URL = process.env.REACT_APP_API_URL;

const Characters = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${API_URL}characters?sortBy=id&sortOrder=desc`);
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
          <th>Element</th>
          <th>Rarity</th>
          <th>Class Name</th>
          <th>Affinity</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        {data.map((d) => (
          <tr key={d.id}>
            <td>{d.id}</td>
            <td>{d.name}</td>
            <td>{d.element.map((e) => e.element)}</td>
            <td>{d.rarity.map((e) => e.rarity)}</td>
            <td>{d.rarity.map((e) => e.className)}</td>
            <td>{d.affinity}</td>
            <td>{d.description}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  ) : (
    <h2>Who is deez?</h2>
  );
};
export default Characters;
