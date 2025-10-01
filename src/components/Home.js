import React, { useEffect, useState } from "react";
import {
  Button,
  Table,
  Spinner,
  Alert,
  Form,
  InputGroup,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../api";

const ActionButton = ({ onClick, variant, children }) => (
  <Button onClick={onClick} variant={variant} className="me-2">
    {children}
  </Button>
);

function Home() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await api.get("/users");
      setUsers(res.data);
    } catch (err) {
      setError("Failed to fetch users.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const setID = (id, Name, Age) => {
    localStorage.setItem("id", id);
    localStorage.setItem("Name", Name);
    localStorage.setItem("Age", Age);
  };

  const deleted = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await api.delete(`/users/${id}`);
        setUsers(users.filter((u) => u.Id !== id));
        toast.success("User deleted successfully!");
      } catch (err) {
        setError("Failed to delete user.");
        toast.error("Delete failed!");
      }
    }
  };

  const filteredUsers = users.filter((user) =>
    user.Name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">User Management Dashboard</h1>

      {/* Search */}
      <InputGroup className="mb-3">
        <Form.Control
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button variant="secondary" onClick={() => setSearch("")}>
          Clear
        </Button>
      </InputGroup>

      {/* Error */}
      {error && <Alert variant="danger">{error}</Alert>}

      {/* Loading */}
      {loading ? (
        <div className="text-center my-5">
          <Spinner animation="border" />
        </div>
      ) : (
        <>
          <Table striped bordered hover responsive className="shadow-sm">
            <thead className="table-dark">
              <tr>
                <th>Name</th>
                <th>Age</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length ? (
                filteredUsers.map(({ Id, Name, Age }) => (
                  <tr key={Id} style={{ backgroundColor: "#fff" }}>
                    <td>{Name}</td>
                    <td>{Age}</td>
                    <td className="text-center">
                      <Link to="/edit">
                        <ActionButton
                          onClick={() => setID(Id, Name, Age)}
                          variant="info"
                        >
                          Edit
                        </ActionButton>
                      </Link>
                      <ActionButton
                        onClick={() => deleted(Id)}
                        variant="danger"
                      >
                        Delete
                      </ActionButton>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="text-center">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </Table>

          {/* Create Button Below Table */}
          <div className="d-grid mt-3">
            <Link to="/create">
              <Button variant="success" size="lg">
                + Create New User
              </Button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
}

export default Home;
