import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Home() {
  let history = useNavigate();
  const [users, setUsers] = useState([]);

  // Fetch users from backend
  useEffect(() => {
    axios
      .get("http://localhost:5000/users")
      .then((res) => setUsers(res.data))
      .catch((err) => console.error(err));
  }, []);

  // Save for Edit.js
  function setID(id, name, age) {
    localStorage.setItem("id", id);
    localStorage.setItem("Name", name);
    localStorage.setItem("Age", age);
  }

  // Delete user
  function deleted(id) {
    axios
      .delete(`http://localhost:5000/users/${id}`)
      .then(() => {
        // Remove from state after delete
        setUsers(users.filter((user) => user.Id !== id));
      })
      .catch((err) => console.error(err));
  }

  return (
    <div style={{ margin: "2rem" }}>
      <h1 className="text-center mb-4">User Management</h1>
      <Table striped bordered hover responsive className="shadow-sm">
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((item) => (
            <tr key={item.Id}>
              <td>{item.Name}</td>
              <td>{item.Age}</td>
              <td>
                <Link to={`/edit`}>
                  <Button
                    onClick={() => setID(item.Id, item.Name, item.Age)}
                    variant="info"
                    className="me-2"
                  >
                    Edit
                  </Button>
                </Link>
                <Button onClick={() => deleted(item.Id)} variant="danger">
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div className="d-grid gap-2 mt-4">
        <Link to="/create">
          <Button variant="success" size="lg">
            Create New User
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
