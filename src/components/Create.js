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

function Create() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !age) {
      setError("Name and Age cannot be empty.");
      return;
    }
    setLoading(true);
    setError("");

    try {
      await api.post("/users", { name, age: Number(age) });
      toast.success("User created successfully!");
      setTimeout(() => navigate("/"), 1200);
    } catch (err) {
      console.error(err);
      setError("Failed to create user.");
      toast.error("Create failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "500px" }}>
      <h2 className="mb-4 text-center">Create New User</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Age</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
          />
        </Form.Group>
        <div className="d-grid gap-2">
          <ActionButton type="submit" variant="success" disabled={loading}>
            {loading && (
              <Spinner animation="border" size="sm" className="me-2" />
            )}{" "}
            Create
          </ActionButton>
        </div>
      </Form>
    </div>
  );
}

export default Create;
