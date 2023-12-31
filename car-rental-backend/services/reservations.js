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
  const q1 = await db.query(`Select * from Cars where id = ${carId}`);
  if (q1[0].status === "outOfService")
    return res.json({ success: false, message: "Car is out of service" });

  const row = await db.query(
    `SELECT * FROM cars as c JOIN reservations as r on c.id = r.carId where c.id = ${carId} AND (r.status = 'reserved' OR r.status = 'confirmed')`
  );
  for (i = 0; i < row.length; i++) {
    const dbStartString = row[i].startDate;
    const dateObject1 = new Date(dbStartString);
    const formattedStartDate = dateObject1.toLocaleDateString("en-US");
    console.log(formattedStartDate);
    const dbEndString = row[i].endDate;
    const dateObject2 = new Date(dbEndString);
    const formattedEndDate = dateObject2.toLocaleDateString("en-US");
    console.log(formattedEndDate);
    const inputStartString = startDate;
    const dateObject3 = new Date(inputStartString);
    const formattedInputStartDate = dateObject3.toLocaleDateString("en-US");
    console.log(formattedInputStartDate);
    const inputEndString = endDate;
    const dateObject4 = new Date(inputEndString);
    const formattedInputEndDate = dateObject4.toLocaleDateString("en-US");
    console.log(formattedInputEndDate);
    if (
      (formattedStartDate < formattedInputEndDate &&
        formattedEndDate > formattedInputEndDate) ||
      (formattedStartDate > formattedInputStartDate &&
        formattedEndDate < formattedInputEndDate) ||
      (formattedStartDate < formattedInputStartDate &&
        formattedEndDate > formattedInputEndDate) ||
      (formattedStartDate < formattedInputStartDate &&
        formattedEndDate < formattedInputEndDate) ||
      (formattedStartDate === formattedInputStartDate &&
        formattedEndDate === formattedInputEndDate)
    )
      return res.json({
        success: false,
        message: `Car is Reserved from ${formattedStartDate} to ${formattedEndDate}`,
      });
  }
  const result = await db.query(
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

async function cancelReservation(req, res) {
  const {
    customerId,
    carId,
    id, //reservation id
  } = req.body;
  const q1 = await db.query(
    `Select * From Reservations Where customerId = ${customerId} And carId = ${carId} And id = ${id} `
  );
  if (q1) {
    const row = await db.query(`UPDATE Reservations
    SET status = 'canceled'
    WHERE id = ${id};`);
    return res.json({
      success: true,
      message: "Reservation Canceled successfully",
    });
  }
  return res.json({ success: false, message: "Reservation Doesn't Exist" });
}

module.exports = {
  getAll,
  getById,
  create,
  remove,
};
