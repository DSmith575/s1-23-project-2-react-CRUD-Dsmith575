import { Table } from "reactstrap";
import axios from "axios";
import { useState, useEffect } from "react";

const Elements = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchElements = async () => {
      try {
        const res = await axios.get(
          "https://smitde5-rest-api.onrender.com/api/v1/elements?sortBy=id&page=1"
        );
        setData(res.data.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchElements();
  }, []);
  return (
    <Table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Element</th>
        </tr>
      </thead>
      <tbody>
        {data.map((e) => (
          <tr>
            <td>{e.character.name}</td>
            <td>{e.element}</td>
            <td></td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default Elements;
