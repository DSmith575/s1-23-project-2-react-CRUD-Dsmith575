import { Table } from "reactstrap";
import axios from "axios";
import { useState, useEffect } from "react";

const Post = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "https://smitde5-rest-api.onrender.com/api/v1/characters?sortBy=id"
          // `https://smitde5-rest-api.onRender.com/api/v1/${data}?page=${pageNumber}`
        );
        setData(res.data.data);
        // console.log(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);
  return (
    <Table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        {data.map((d) => (
          <tr>
            <td>{d.id}</td>
            <td>{d.name}</td>
            <td>{d.description}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};
export default Post;