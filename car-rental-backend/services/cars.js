const db = require("./db");
const helper = require("../helper");
const config = require("../config");

async function getAll(page = 1) {
  try {
    const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query(
      `SELECT * FROM cars LIMIT ${offset},${config.listPerPage}`
    );

    const data = helper.emptyOrRows(rows);
    const totalRows = await db.query(`SELECT COUNT(*) FROM cars`); // Get total rows
    const meta = {
      page,
      totalPages: Math.ceil(totalRows[0].count / config.listPerPage),
    };

    return { data, meta };
  } catch (error) {
    console.error("Error fetching cars:", error);
    throw error; // Re-throw for proper error handling in frontend
  }
}

async function getByFilters(req, res) {
  const filterConditions = Object.entries(req.body)
    .filter(([key, value]) => value !== "") // Ignore empty filters
    .map(([key, value]) => `${key} = "${value}"`)
    .join(" AND ");
  var string = "";
  if (filterConditions) {
    string = "Where " + filterConditions;
  }
  console.log(string);

  const query = `SELECT * FROM cars  ${string}`;
  const rows = await db.query(query);
  console.log(query);
  return res.json({ success: true, data: rows });
}

async function getByYear(req, res) {
  try {
    const row = await db.query(
      `SELECT *
      FROM cars WHERE year = ?`,
      [req.params.year]
    );

    if (!row.length) {
      return res.json({ success: false, message: "Car not found" });
    }

    return res.json({ success: true, data: row });
  } catch (error) {
    console.error("Error fetching car:", error);
    return res
      .status(500)
      .json({ success: false, message: "Failed to retrieve car" });
  }
}

async function getById(req, res) {
  try {
    const row = await db.query(
      `SELECT *
      FROM cars WHERE id = ?`,
      [req.params.id]
    );

    if (!row.length) {
      return res.json({ success: false, message: "Car not found" });
    }

    return res.json({ success: true, data: row });
  } catch (error) {
    console.error("Error fetching car:", error);
    return res
      .status(500)
      .json({ success: false, message: "Failed to retrieve car" });
  }
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
    `INSERT INTO cars (model, year, plateId, status, office_id, images, dailyPrice, weeklyPrice, mileage, features) VALUES
     ("${model}", "${year}", "${plateId}", "${status}",
     "${office_id}", "${images}", "${dailyPrice}", "${weeklyPrice}",
      "${weeklyPrice}", "${mileage}", "${features}")`
  );
  const data = helper.emptyOrRows(rows);
  return data[0];
}

async function remove(id) {
  const rowsDeleted = await db.query(`DELETE FROM cars WHERE id = "${id}"`);
  return rowsDeleted.affectedRows === 1; // Check if deletion occurred
}

module.exports = {
  getAll,
  getById,
  getByYear,
  getByFilters,
  create,
  remove,
};
