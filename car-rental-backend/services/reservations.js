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
  const {
    customerId,
    carId,
    startDate,
    endDate,
    amountPaid,
    totalPrice,
    status,
    cvc,
    cardNumber,
    cardOwner,
  } = req.body;
  if (
    customerId === "" ||
    carId === "" ||
    startDate === "" ||
    endDate === "" ||
    amountPaid === "" ||
    totalPrice === "" ||
    status === "" ||
    cvc === "" ||
    cardNumber === "" ||
    cardOwner === ""
  ) {
    return res.json({
      success: false,
      message: "Please enter all fields",
    });
  }

  const row = await db.query("SELECT * FROM cars WHERE id = ?", [carId]);

  if (row[0].status === "rented" || row[0].status === "outOfService") {
    const reservedDates = await db.query(`Select startData, endDate
    From reservations where carId = ${carId} AND (status = reserved OR stats = confirmed)`);
    return res.json({ success: false, message: "car is unavailable" });
  }
  await db.query(
    `INSERT INTO reservations (customerId,
      carId,
      startDate,
      endDate,
      amountPaid,
      totalPrice,
      status,
      cvc,
      cardNumber,
      cardOwner) VALUES
     ("${customerId}", "${carId}", "${startDate}", "${endDate}",
     "${amountPaid}", "${totalPrice}", "${status}", "${cvc}", "${cardNumber}", "${cardOwner}")`
  );
  await db.query(
    `UPDATE cars
    SET status = 'rented'
    WHERE id = ${carId}`
  );
  return res.json({
    success: true,
    message: "Car Successfully Reserved",
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
