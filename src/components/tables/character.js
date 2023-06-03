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

const Post = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `https://smitde5-rest-api.onrender.com/api/v1/characters?sortBy=id&sortOrder=desc`
        );
        setData(res.data.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);
  return (
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
  );
};
export default Post;
