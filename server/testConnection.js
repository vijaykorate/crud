const { sql, poolConnect } = require("./db");

async function test() {
  try {
    await poolConnect;
    console.log("✅ Connected to SQL Server successfully!");
  } catch (err) {
    console.error("❌ Connection failed:", err);
  }
}

test();
