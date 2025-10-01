import React, { useState } from "react";
import { Button, Form, Spinner, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../api";

const ActionButton = ({ onClick, variant, children, disabled, type }) => (
  <Button
    onClick={onClick}
    variant={variant}
    disabled={disabled}
    type={type}
    className="me-2"
  >
    {children}
  </Button>
);

function Edit() {
  const navigate = useNavigate();
  const [name, setName] = useState(localStorage.getItem("Name") || "");
  const [age, setAge] = useState(localStorage.getItem("Age") || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const id = localStorage.getItem("id");

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!name || !age) {
      setError("Name and Age cannot be empty.");
      return;
    }
    setLoading(true);
    setError("");

    try {
      await api.put(`/users/${id}`, { name, age: Number(age) });
      toast.success("User updated successfully!");
      localStorage.removeItem("Name");
      localStorage.removeItem("Age");
      localStorage.removeItem("id");
      setTimeout(() => navigate("/"), 1200);
    } catch (err) {
      console.error(err);
      setError("Failed to update user.");
      toast.error("Update failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "500px" }}>
      <h2 className="mb-4 text-center">Edit User</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleUpdate}>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Age</Form.Label>
          <Form.Control
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
          />
        </Form.Group>
        <div className="d-grid gap-2">
          <ActionButton type="submit" variant="info" disabled={loading}>
            {loading && (
              <Spinner animation="border" size="sm" className="me-2" />
            )}{" "}
            Update
          </ActionButton>
        </div>
      </Form>
    </div>
  );
}

export default Edit;
