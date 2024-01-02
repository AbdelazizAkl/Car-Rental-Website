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
async function getById(req, res) {
  const { id } = req.body;
  try {
    const row = await db.query(
      `SELECT *
      FROM reservations WHERE id = ?`,
      [id]
    );

    if (!row.length) {
      return res.json({ success: false, message: "reservation not found" });
    }

    return res.json({ success: true, data: row });
  } catch (error) {
    console.error("Error fetching reservation:", error);
    return res
      .status(500)
      .json({ success: false, message: "Failed to retrieve reservation" });
  }
}
async function getByCustomerId(req, res) {
  const { customerId } = req.body;
  try {
    const row = await db.query(
      `SELECT *
      FROM reservations WHERE customerId = ?`,
      [customerId]
    );

    if (!row.length) {
      return res.json({ success: false, message: "reservation not found" });
    }

    return res.json({ success: true, data: row });
  } catch (error) {
    console.error("Error fetching reservation:", error);
    return res
      .status(500)
      .json({ success: false, message: "Failed to retrieve reservation" });
  }
}
async function getByCarId(req, res) {
  const { carId } = req.body;
  try {
    const row = await db.query(
      `SELECT *
      FROM reservations WHERE carId = ?`,
      [carId]
    );

    if (!row.length) {
      return res.json({ success: false, message: "reservation not found" });
    }

    return res.json({ success: true, data: row });
  } catch (error) {
    console.error("Error fetching reservation:", error);
    return res
      .status(500)
      .json({ success: false, message: "Failed to retrieve reservation" });
  }
}
async function getByStartDate(req, res) {
  const { startDate } = req.body;
  try {
    const row = await db.query(
      `SELECT *
      FROM reservations WHERE startDate = ?`,
      [startDate]
    );

    if (!row.length) {
      return res.json({ success: false, message: "reservation not found" });
    }

    return res.json({ success: true, data: row });
  } catch (error) {
    console.error("Error fetching reservation:", error);
    return res
      .status(500)
      .json({ success: false, message: "Failed to retrieve reservation" });
  }
}
async function getByReservationDate(req, res) {
  const { ReservationDate } = req.body;
  try {
    const row = await db.query(
      `SELECT *
      FROM reservations WHERE ReservationDate = ?`,
      [ReservationDate]
    );

    if (!row.length) {
      return res.json({ success: false, message: "reservation not found" });
    }

    return res.json({ success: true, data: row });
  } catch (error) {
    console.error("Error fetching reservation:", error);
    return res
      .status(500)
      .json({ success: false, message: "Failed to retrieve reservation" });
  }
}
async function getByAmountPaid(req, res) {
  const { amountPaid } = req.body;
  try {
    const row = await db.query(
      `SELECT *
      FROM reservations WHERE amountPaid = ?`,
      [amountPaid]
    );

    if (!row.length) {
      return res.json({ success: false, message: "reservation not found" });
    }

    return res.json({ success: true, data: row });
  } catch (error) {
    console.error("Error fetching reservation:", error);
    return res
      .status(500)
      .json({ success: false, message: "Failed to retrieve reservation" });
  }
}
async function getByTotalPrice(req, res) {
  const { totalPrice } = req.body;
  try {
    const row = await db.query(
      `SELECT *
      FROM reservations WHERE totalPrice = ?`,
      [totalPrice]
    );

    if (!row.length) {
      return res.json({ success: false, message: "reservation not found" });
    }

    return res.json({ success: true, data: row });
  } catch (error) {
    console.error("Error fetching reservation:", error);
    return res
      .status(500)
      .json({ success: false, message: "Failed to retrieve reservation" });
  }
}
async function getByStatus(req, res) {
  const { status } = req.body;
  try {
    const row = await db.query(
      `SELECT *
      FROM reservations WHERE status = ?`,
      [status]
    );

    if (!row.length) {
      return res.json({ success: false, message: "reservation not found" });
    }

    return res.json({ success: true, data: row });
  } catch (error) {
    console.error("Error fetching reservation:", error);
    return res
      .status(500)
      .json({ success: false, message: "Failed to retrieve reservation" });
  }
}
async function getByEndDate(req, res) {
  const { endDate } = req.body;
  try {
    const row = await db.query(
      `SELECT *
      FROM reservations WHERE endDate = ?`,
      [endDate]
    );

    if (!row.length) {
      return res.json({ success: false, message: "reservation not found" });
    }

    return res.json({ success: true, data: row });
  } catch (error) {
    console.error("Error fetching reservation:", error);
    return res
      .status(500)
      .json({ success: false, message: "Failed to retrieve reservation" });
  }
}

async function getByCustomerID(req, res) {
  const { id } = req.body;
  // console.log(req.body); // Get the customer ID from the request body

  try {
    const rows = await db.query(
      `SELECT R.startDate, R.endDate, R.customerId, R.carId, R.amountPaid, R.totalPrice, R.status, C.brand, C.model FROM reservations as R JOIN cars as c on r.carId = c.id WHERE customerId = ?`,
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

async function getRevenueByDate(req, res) {
  const { day } = req.body;
  const row = await db.query(
    `SELECT
    COALESCE (SUM(
        CASE
            WHEN DATE('${day}') = reservations.ReservationDate THEN reservations.amountPaid
            WHEN DATE('${day}') = reservations.EndDate THEN reservations.amountPaid
            ELSE 0
        END
    ),0) AS DailyRevenue
FROM
    reservations
WHERE
    DATE('${day}') IN (reservations.ReservationDate, reservations.EndDate);`
  );
  const dailyRevenue = row[0].DailyRevenue || "0.00";
  res.json({ success: true, data: { date: day, revenue: dailyRevenue } });
}

async function getAllByDate(req, res) {
  const { startDate, endDate } = req.body;
  const row = await db.query(
    `SELECT
    r.id AS reservation_id,
    r.carId,
    r.customerId,
    r.startDate,
    r.endDate,
    r.amountPaid,
    r.totalPrice,
    r.ReservationDate,
    r.status, 
    c.fName,
    c.lName,
    c.email,
    c.address,
    c.phone,
    c.PassportNumber,
    car.model,
    car.brand,
    car.year,
    car.color,
    car.office_id,
    car.dailyPrice,
    car.weeklyPrice,
    car.mileage,
    car.plateId
    FROM reservations AS r
    JOIN customers AS c ON r.customerId = c.id
    JOIN cars AS car ON r.carId = car.id
    WHERE (R.startDate BETWEEN DATE('${startDate}') AND DATE('${endDate}')) OR (R.endDate BETWEEN DATE('${startDate}') AND DATE('${endDate}'));`
  );
  for (i = 0; i < row.length; i++) {
    const dbStartString = row[i].startDate;
    const dateObject1 = new Date(dbStartString);
    const formattedStartDate = dateObject1.toLocaleDateString("en-US");
    row[i].startDate = formattedStartDate;
    const dbEndString = row[i].endDate;
    const dateObject2 = new Date(dbEndString);
    const formattedEndDate = dateObject2.toLocaleDateString("en-US");
    row[i].endDate = formattedEndDate;
    const dbReservationString = row[i].ReservationDate;
    const dateObject3 = new Date(dbReservationString);
    const formattedResDate = dateObject3.toLocaleDateString("en-US");
    row[i].ReservationDate = formattedResDate;
  }
  console.log(row);
  const data = helper.emptyOrRows(row);
  return {
    data,
  };
}

async function getAllByCarId(req, res) {
  const { startDate, endDate } = req.body;
  const row = await db.query(
    `SELECT r.id AS reservation_id,
    r.carId,
    r.customerId,
    r.startDate,
    r.endDate,
    r.amountPaid,
    r.totalPrice,
    r.ReservationDate,
    r.status,
    car.model,
    car.brand,
    car.year,
    car.color,
    car.office_id,
    car.dailyPrice,
    car.weeklyPrice,
    car.mileage,
    car.plateId
     FROM reservations AS r
     JOIN cars AS car ON r.carId = car.id
     WHERE (R.startDate BETWEEN DATE('${startDate}') AND DATE('${endDate}')) OR (R.endDate BETWEEN DATE('${startDate}') AND DATE('${endDate}'))`
  );
  for (i = 0; i < row.length; i++) {
    const dbStartString = row[i].startDate;
    const dateObject1 = new Date(dbStartString);
    const formattedStartDate = dateObject1.toLocaleDateString("en-US");
    row[i].startDate = formattedStartDate;
    const dbEndString = row[i].endDate;
    const dateObject2 = new Date(dbEndString);
    const formattedEndDate = dateObject2.toLocaleDateString("en-US");
    row[i].endDate = formattedEndDate;
    const dbReservationString = row[i].ReservationDate;
    const dateObject3 = new Date(dbReservationString);
    const formattedResDate = dateObject3.toLocaleDateString("en-US");
    row[i].ReservationDate = formattedResDate;
  }
  return res.json({ success: true, data: row });
}

async function getReservationsByCustomer(req, res) {
  const { id } = req.body;
  try {
    const row = await db.query(
      `SELECT
    r.id AS reservation_id,
    r.carId,
    r.customerId,
    r.startDate,
    r.endDate,
    r.amountPaid,
    r.totalPrice,
    r.ReservationDate,
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
  WHERE r.customerId = ${id};`
    );

    return res.json({ success: true, data: row });
  } catch (error) {
    console.log("Error fetching car:", error);
    return res
      .status(500)
      .json({ success: false, message: "Failed to retrieve car" });
  }
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
  getByAmountPaid,
  getByCarId,
  getByCustomerId,
  getByStartDate,
  getByStatus,
  getByTotalPrice,
  getByReservationDate,
  getByEndDate,
  getRevenueByDate,
  getAllByDate,
  getAllByCarId,
  getReservationsByCustomer,
  create,
  remove,
  getByCustomerID,
  cancelReservation,
};
