const db = require("./db");
const helper = require("../helper");
const config = require("../config");

async function getAll(page = 1) {
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT *
    FROM customers LIMIT ${offset},${config.listPerPage}`
  );
  const data = helper.emptyOrRows(rows);
  const meta = { page };

  return {
    data,
    meta,
  };
}

async function login(req, res) {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }
    console.log("before");
    // Query database
    const row = await db.query(
      `SELECT * FROM customers WHERE email,password = ?`,
      [email, password]
    );
    console.log("after");
    // Check if user exists
    if (!row.length) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, row[0].password);
    const isValidEmail = await bcrypt.compare(email, row[0].email); // Assuming password is hashed
    if (!isValidPassword) {
      return res.status(401).json({ message: "Invalid password" });
    }
    if (!isValidEmail) {
      return res.status(401).json({ message: "Invalid email" });
    }

    // Generate authentication token (example using jsonwebtoken)
    const token = jwt.sign({ userId: row[0].id }, "your-secret-key");

    // Return success response with token
    res.json({ message: "Login successful", token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function getById(id) {
  const row = await db.query(
    `SELECT *
    FROM customers WHERE id = ?`,
    [id]
  );
  const data = helper.emptyOrRows(row);
  return {
    data,
  };
}

async function create(
  model,
  year,
  plateId,
  status,
  office_id,
  images,
  dailyPrice,
  weeklyPrice,
  mileage,
  features
) {
  // Hash the password before storing
  //   const hashedPassword = await bcrypt.hash(password, 10);
  const rows = await db.query(
    `INSERT INTO customers (fName, lName, email, password, address, phone, driversLiscense) VALUES
     ("${fName}", "${lName}", "${email}", "${password}",
     "${address}", "${phone}", "${driversLiscense}")`
  );
  const data = helper.emptyOrRows(rows);
  return data[0];
}

async function remove(id) {
  const rowsDeleted = await db.query(
    `DELETE FROM customers WHERE id = "${id}"`
  );
  return rowsDeleted.affectedRows === 1; // Check if deletion occurred
}

module.exports = {
  getAll,
  getById,
  create,
  remove,
};
