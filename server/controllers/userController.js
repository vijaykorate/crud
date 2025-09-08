const { sql, poolPromise } = require("../db");

// GET all users
async function getUsers(req, res) {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query("SELECT * FROM Users");
    res.json(result.recordset);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

// GET user by ID
async function getUserById(req, res) {
  try {
    const pool = await poolPromise;
    const { id } = req.params;
    const result = await pool
      .request()
      .input("id", sql.Int, id)
      .query("SELECT * FROM Users WHERE Id = @id");
    res.json(result.recordset[0]);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

// POST create user
async function createUser(req, res) {
  try {
    const pool = await poolPromise;
    const { name, email } = req.body;
    await pool
      .request()
      .input("name", sql.VarChar, name)
      .input("email", sql.VarChar, email)
      .query("INSERT INTO Users (Name, Email) VALUES (@name, @email)");
    res.send("User created successfully");
  } catch (err) {
    res.status(500).send(err.message);
  }
}

// PUT update user
async function updateUser(req, res) {
  try {
    const pool = await poolPromise;
    const { id } = req.params;
    const { name, email } = req.body;
    await pool
      .request()
      .input("id", sql.Int, id)
      .input("name", sql.VarChar, name)
      .input("email", sql.VarChar, email)
      .query("UPDATE Users SET Name=@name, Email=@email WHERE Id=@id");
    res.send("User updated successfully");
  } catch (err) {
    res.status(500).send(err.message);
  }
}

// DELETE user
async function deleteUser(req, res) {
  try {
    const pool = await poolPromise;
    const { id } = req.params;
    await pool
      .request()
      .input("id", sql.Int, id)
      .query("DELETE FROM Users WHERE Id=@id");
    res.send("User deleted successfully");
  } catch (err) {
    res.status(500).send(err.message);
  }
}

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
