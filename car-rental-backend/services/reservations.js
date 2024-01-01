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
async function getByCustomerID(req, res) {
  const { id } = req.body;
  // console.log(req.body); // Get the customer ID from the request body

  try {
    const rows = await db.query(
      `SELECT R.id, R.startDate, R.endDate, R.customerId, R.carId, R.amountPaid, R.totalPrice, R.status, C.brand, C.model FROM reservations as R JOIN cars as c on r.carId = c.id WHERE customerId = ?`,
      [id]
    );

    for (i = 0; i < rows.length; i++) {
      const dbStartString = rows[i].startDate;
      const dateObject1 = new Date(dbStartString);
      const formattedStartDate = dateObject1.toLocaleDateString("en-US");
      rows[i].startDate = formattedStartDate;
      const dbEndString = rows[i].endDate;
      const dateObject2 = new Date(dbEndString);
      const formattedEndDate = dateObject2.toLocaleDateString("en-US");
      rows[i].endDate = formattedEndDate;
    }
    // console.log(rows); // Log the rows to see the data

    return res.json({ success: true, data: rows });
  } catch (error) {
    console.error("Error fetching reservation data:", error);
    return res
      .status(500)
      .json({ success: false, error: "Internal Server Error" });
  }
}

async function getRevenueByDate(startDate) {
  const row = await db.query(
    `SELECT 
    SUM(amountPaid) AS total_daily_payments
    FROM reservations
    WHERE startDate BETWEEN '?' AND '?'
    GROUP BY startDate`[(startDate, startDate)]
  );
  const data = helper.emptyOrRows(row);
  return {
    data,
  };
}

async function getAllByDate(startDate) {
  const row = await db.query(
    `SELECT *
    FROM reservations AS R
    JOIN customers AS C ON R.customerId = C.id
    JOIN cars AS CA ON R.carId = CA.id
    WHERE (R.startDate BETWEEN ? AND ?) OR (R.endDate BETWEEN ? AND ?);`[
      (startDate, startDate, startDate, startDate)
    ]
  );
  const data = helper.emptyOrRows(row);
  return {
    data,
  };
}

async function getAllByCarId(startDate, endDate) {
  const rows = await db.query(
    `SELECT *
     FROM reservations AS R
     JOIN cars AS CA ON R.carId = CA.id
     WHERE (R.startDate BETWEEN ? AND ?) OR (R.endDate BETWEEN ? AND ?);;`[
      (startDate, startDate, startDate, startDate)
    ]
  );
  const data = helper.emptyOrRows(row);
  return {
    data,
  };
}

async function getReservationsByCustomer(customerId) {
  const row = await db.query(
    `SELECT
    r.id AS reservation_id,
    r.carId,
    r.customerId,
    r.startDate,
    r.endDate,
    r.amountPaid,
    r.totalPrice,
    r.status, 
    c.fName,
    c.lName,
    c.email,
    c.address,
    c.phone,
    c.PassportNumber,
    car.model,
    car.plateId
  FROM Reservations r
  JOIN customers c ON r.customerId = c.id
  JOIN cars car ON r.carId = car.id
  WHERE c.customerId = ?;`[customerId]
  );
  const data = helper.emptyOrRows(row);
  return {
    data,
  };
}

async function advancedSearch() {
  const row = await db.query(
    `SELECT *
     FROM Reservations
     JOIN Cars ON Reservations.carId = Cars.id
     JOIN Customers ON Reservations.customerId = Customers.id
     WHERE
     Cars.brand LIKE '?' OR
     Cars.model LIKE '?' OR
     Cars.color LIKE '?' OR
     Cars.plateId LIKE '?' OR
     Customers.fName LIKE '?' OR
     Customers.lName LIKE '?' OR
     Customers.email LIKE '?' OR
     Reservations.startDate = '?' OR
     Reservations.endDate = '?';`
  );
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
  const { customerId, carId, id } = req.body;
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
  getRevenueByDate,
  getAllByDate,
  getAllByCarId,
  advancedSearch,
  getReservationsByCustomer,
  create,
  remove,
  getByCustomerID,
  cancelReservation,
};
