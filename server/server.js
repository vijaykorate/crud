const express = require("express");
const sql = require("mssql");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_DATABASE,
  port: Number(process.env.DB_PORT || 1433),
  options: {
    encrypt: process.env.DB_ENCRYPT === "true",
    trustServerCertificate: true, // local dev
  },
};

// connect pool once
const pool = new sql.ConnectionPool(dbConfig);
const poolConnect = pool.connect();

// ------- CRUD -------
app.get("/users", async (req, res) => {
  try {
    await poolConnect;
    const result = await pool
      .request()
      .query("SELECT * FROM Users ORDER BY Id DESC");
    res.json(result.recordset);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.post("/users", async (req, res) => {
  try {
    const { name, age } = req.body;
    await poolConnect;
    await pool
      .request()
      .input("Name", sql.NVarChar(100), name)
      .input("Age", sql.Int, age)
      .query("INSERT INTO Users (Name, Age) VALUES (@Name, @Age)");
    res.json({ message: "User added" });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.put("/users/:id", async (req, res) => {
  try {
    const { name, age } = req.body;
    const { id } = req.params;
    await poolConnect;
    await pool
      .request()
      .input("Id", sql.Int, Number(id))
      .input("Name", sql.NVarChar(100), name)
      .input("Age", sql.Int, age)
      .query("UPDATE Users SET Name=@Name, Age=@Age WHERE Id=@Id");
    res.json({ message: "User updated" });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.delete("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await poolConnect;
    await pool
      .request()
      .input("Id", sql.Int, Number(id))
      .query("DELETE FROM Users WHERE Id=@Id");
    res.json({ message: "User deleted" });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`API running at http://localhost:${PORT}`));
