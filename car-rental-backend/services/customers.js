const db = require("./db");
const helper = require("../helper");
const config = require("../config");
const bcrypt = require("bcrypt");
var emailValidator = require("email-validator");

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

    if (email === "" || password === "") {
      return res.json({
        success: false,
        message: "Email and password are required",
      });
    }
    if (!emailValidator.validate(email)) {
      return res.json({
        success: false,
        message: "Please enter a valid email",
      });
    }

    const row = await db.query("SELECT * FROM customers WHERE email = ?", [
      email,
    ]);

    if (!row.length)
      return res.json({ success: false, message: "Invalid email!" });
    const hashedPassword = row[0].password;

    bcrypt.compare(password, hashedPassword, (error, passwordMatch) => {
      if (error) {
        return res.json({
          success: false,
          message: "An error occurred while processing your request.",
        });
      } else if (!passwordMatch) {
        return res.json({
          success: false,
          message: "Invalid password.",
        });
      }
      row[0].password = undefined;
      return res.json({ success: true, message: "successs", userData: row[0] });
    });
  } catch (error) {
    console.log(error);
  }
}

async function create(req, res) {
  const {
    fName,
    lName,
    email,
    password,
    confirmPassword,
    address,
    phone,
    PassportNumber,
  } = req.body;
  if (
    fName === "" ||
    lName === "" ||
    email === "" ||
    password === "" ||
    address === "" ||
    phone === "" ||
    PassportNumber === ""
  ) {
    return res.json({
      success: false,
      message: "Please enter all fields",
    });
  }
  if (!emailValidator.validate(email)) {
    return res.json({
      success: false,
      message: "Please enter a valid email",
    });
  }
  if (!(password === confirmPassword)) {
    return res.json({
      success: false,
      message: "Passwords do not match",
    });
  }
  const phoneValidation = await db.query(
    `SELECT phone FROM customers WHERE phone = ${phone}`
  );
  if (phoneValidation.length) {
    return res.json({
      success: false,
      message: "Phone Number Already Exists!",
    });
  }
  const pnValidation = await db.query(
    `SELECT PassportNumber FROM customers WHERE PassportNumber = ${PassportNumber}`
  );
  if (pnValidation.length) {
    return res.json({
      success: false,
      message: "Passport Number Already Exists!",
    });
  }
  const row = await db.query("SELECT password FROM customers WHERE email = ?", [
    email,
  ]);

  if (row.length)
    return res.json({ success: false, message: "Email already in use!" });

  // Hash the password before storing
  //   const hashedPassword = await bcrypt.hash(password, 10);
  const hash = await bcrypt.hash(password, 10);
  console.log(hash);
  const signup = await db.query(
    `INSERT INTO customers (fName, lName, email, password, address, phone, PassportNumber) VALUES
     ("${fName}", "${lName}", "${email}", "${hash}",
     "${address}", "${phone}", "${PassportNumber}")`
  );
  if (!signup)
    return res.json({
      success: false,
      message: "Error inserting into database",
    });
  return res.json({
    success: true,
    message: "Registration completed successfully",
  });
}

async function getById(req, res) {
  const { id } = req.body;
  try {
    const row = await db.query(
      `SELECT *
      FROM customers WHERE id = ?`,
      [id]
    );

    if (!row.length) {
      return res.json({ success: false, message: "customer not found" });
    }

    return res.json({ success: true, data: row });
  } catch (error) {
    console.error("Error fetching customer:", error);
    return res
      .status(500)
      .json({ success: false, message: "Failed to retrieve customer" });
  }
}
async function getByFirstName(req, res) {
  const { fName } = req.body;
  try {
    const row = await db.query(
      `SELECT *
      FROM customers WHERE fName = ?`,
      [fName]
    );

    if (!row.length) {
      return res.json({ success: false, message: "customer not found" });
    }

    return res.json({ success: true, data: row });
  } catch (error) {
    console.error("Error fetching customer:", error);
    return res
      .status(500)
      .json({ success: false, message: "Failed to retrieve customer" });
  }
}
async function getByLastName(req, res) {
  const { lName } = req.body;
  try {
    const row = await db.query(
      `SELECT *
      FROM customers WHERE lName = ?`,
      [lName]
    );

    if (!row.length) {
      return res.json({ success: false, message: "customer not found" });
    }

    return res.json({ success: true, data: row });
  } catch (error) {
    console.error("Error fetching customer:", error);
    return res
      .status(500)
      .json({ success: false, message: "Failed to retrieve customer" });
  }
}
async function getByEmail(req, res) {
  const { email } = req.body;
  try {
    const row = await db.query(
      `SELECT *
      FROM customers WHERE email = ?`,
      [email]
    );

    if (!row.length) {
      return res.json({ success: false, message: "customer not found" });
    }

    return res.json({ success: true, data: row });
  } catch (error) {
    console.error("Error fetching customer:", error);
    return res
      .status(500)
      .json({ success: false, message: "Failed to retrieve customer" });
  }
}
async function getByAddress(req, res) {
  const { address } = req.body;
  try {
    const row = await db.query(
      `SELECT *
      FROM customers WHERE address = ?`,
      [address]
    );

    if (!row.length) {
      return res.json({ success: false, message: "customer not found" });
    }

    return res.json({ success: true, data: row });
  } catch (error) {
    console.error("Error fetching customer:", error);
    return res
      .status(500)
      .json({ success: false, message: "Failed to retrieve customer" });
  }
}
async function getByPhone(req, res) {
  const { phone } = req.body;
  try {
    const row = await db.query(
      `SELECT *
      FROM customers WHERE phone = ?`,
      [phone]
    );

    if (!row.length) {
      return res.json({ success: false, message: "customer not found" });
    }

    return res.json({ success: true, data: row });
  } catch (error) {
    console.error("Error fetching customer:", error);
    return res
      .status(500)
      .json({ success: false, message: "Failed to retrieve customer" });
  }
}
async function getByPassportNumber(req, res) {
  const { PassportNumber } = req.body;
  try {
    const row = await db.query(
      `SELECT *
      FROM customers WHERE PassportNumber = ?`,
      [PassportNumber]
    );

    if (!row.length) {
      return res.json({ success: false, message: "customer not found" });
    }

    return res.json({ success: true, data: row });
  } catch (error) {
    console.error("Error fetching customer:", error);
    return res
      .status(500)
      .json({ success: false, message: "Failed to retrieve customer" });
  }
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
  getByFirstName,
  getByLastName,
  getByEmail,
  getByAddress,
  getByPhone,
  getByPassportNumber,
  create,
  login,
  remove,
};
