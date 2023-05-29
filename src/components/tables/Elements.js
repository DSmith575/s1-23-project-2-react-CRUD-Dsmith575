/**
 * Element Table
 *
 * Handles displaying element table in browser
 *
 * @file: elements.js
 * @version: 1.0.0
 * @author: Deacon Smith <SMITDE5@student.op.ac.nz>
 * @created: 2023-05-21
 * @updated: 2023-05-28
 */

import { Table } from "reactstrap";
import axios from "axios";
import { useState, useEffect } from "react";

const Elements = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchElements = async () => {
      try {
        const res = await axios.get(
          "https://smitde5-rest-api.onrender.com/api/v1/elements?sortBy=id&sortOrder=desc"
        );
        setData(res.data.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchElements();
  }, []);
  return (
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
  );
};

export default Elements;
