const db = require("./db");
const helper = require("../helper");
const config = require("../config");

async function getAll(page = 1) {
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT * FROM reservations LIMIT ${offset},${config.listPerPage}`
  );
  const data = helper.emptyOrRows(rows);
  const meta = { page };

  return {
    data,
    meta,
  };
}
async function getById(id) {
  const row = await db.query(`SELECT * FROM reservations WHERE id = ?`, [id]);
  const data = helper.emptyOrRows(row);
  return {
    data,
  };
}

async function create(req, res) {
  const { reservationId, amount, cvc, cardNumber, cardOwner } = req.body;
  if (
    reservationId === "" ||
    amount === "" ||
    cvc === "" ||
    cardNumber === "" ||
    cardOwner === ""
  ) {
    return res.json({
      success: false,
      message: "Please enter all fields",
    });
  }
  if (!(password === confirmPassword)) {
    return res.json({
      success: false,
      message: "Passwords do not match",
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
  const rows = await db.query(
    `INSERT INTO customers (fName, lName, email, password, address, phone, PassportNumber) VALUES
     ("${fName}", "${lName}", "${email}", "${hash}",
     "${address}", "${phone}", "${PassportNumber}")`
  );
  return res.json({
    success: true,
    message: "Signed up successfully!",
  });
}

async function remove(id) {
  const rowsDeleted = await db.query(
    `DELETE FROM reservations WHERE id = "${id}"`
  );
  return rowsDeleted.affectedRows === 1; // Check if deletion occurred
}

module.exports = {
  getAll,
  getById,
  create,
  remove,
};
