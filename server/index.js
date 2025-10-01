// index.js (Backend)

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const sql = require("mssql");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MSSQL configuration
const dbConfig = {
  user: "YOUR_DB_USERNAME",
  password: "YOUR_DB_PASSWORD",
  server: "YOUR_DB_SERVER", // e.g., "localhost" or "127.0.0.1"
  database: "YOUR_DB_NAME",
  options: {
    encrypt: false, // true if using Azure
    trustServerCertificate: true,
  },
};

// Connect to MSSQL
sql
  .connect(dbConfig)
  .then(() => console.log("Connected to MSSQL"))
  .catch((err) => console.error("DB Connection Error: ", err));

// GET all users
app.get("/users", async (req, res) => {
  try {
    const result = await sql.query("SELECT * FROM Users");
    res.json(result.recordset);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET single user by Id
app.get("/users/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await sql.query(`SELECT * FROM Users WHERE Id = ${id}`);
    res.json(result.recordset[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// CREATE a new user
app.post("/users", async (req, res) => {
  const { name, age } = req.body;
  try {
    await sql.query(`INSERT INTO Users (Name, Age) VALUES ('${name}', ${age})`);
    res.json({ message: "User created successfully!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE a user
app.put("/users/:id", async (req, res) => {
  const { id } = req.params;
  const { name, age } = req.body;
  try {
    await sql.query(
      `UPDATE Users SET Name='${name}', Age=${age} WHERE Id=${id}`
    );
    res.json({ message: "User updated successfully!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE a user
app.delete("/users/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await sql.query(`DELETE FROM Users WHERE Id=${id}`);
    res.json({ message: "User deleted successfully!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
