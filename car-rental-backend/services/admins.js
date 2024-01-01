const db = require("./db");
const helper = require("../helper");
const config = require("../config");
const bcrypt = require("bcrypt");
var emailValidator = require("email-validator");

async function getAll(page = 1) {
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT *
    FROM admins LIMIT ${offset},${config.listPerPage}`
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

    const row = await db.query("SELECT password FROM admins WHERE email = ?", [
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
      return res.json({
        success: true,
        message: "successs",
        adminData: row[0],
      });
    });
  } catch (error) {
    console.log(error);
  }
}

async function getById(id) {
  const row = await db.query(
    `SELECT id, email, password FROM admins WHERE id = ?`,
    [id]
  );
  const data = helper.emptyOrRows(row);
  return {
    data,
  };
}

async function create(email, password) {
  // Hash the password before storing
  //   const hashedPassword = await bcrypt.hash(password, 10);
  const rows = await db.query(
    `INSERT INTO admins (email, password) VALUES ("${email}", "${password}")`
  );
  const data = helper.emptyOrRows(rows);
  return data[0];
}

async function remove(id) {
  const rowsDeleted = await db.query(`DELETE FROM admins WHERE id = "${id}"`);
  return rowsDeleted.affectedRows === 1; // Check if deletion occurred
}

module.exports = {
  getAll,
  getById,
  create,
  remove,
  login,
};
