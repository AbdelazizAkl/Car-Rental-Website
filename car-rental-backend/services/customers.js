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

    const row = await db.query(
      "SELECT password FROM customers WHERE email = ?",
      [email]
    );

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
      return res.json({ success: true, message: "successs" });
    });
  } catch (error) {
    console.log(error);
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
  const hash = bcrypt.hash(password, saltRounds, function (err, hash) {});
  const rows = await db.query(
    `INSERT INTO customers (fName, lName, email, password, address, phone, driversLiscense) VALUES
     ("${fName}", "${lName}", "${email}", "${hash}",
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
  login,
};
