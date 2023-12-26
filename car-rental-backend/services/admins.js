const db = require("./db");
const helper = require("../helper");
const config = require("../config");

async function getAll(page = 1) {
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT id, email, password
    FROM admins LIMIT ${offset},${config.listPerPage}`
  );
  const data = helper.emptyOrRows(rows);
  const meta = { page };

  return {
    data,
    meta,
  };
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
};
