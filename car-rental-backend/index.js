const express = require("express");
const app = express();
var cors = require("cors");
const port = 3000;
const adminsRouter = require("./routes/admins");
const officesRouter = require("./routes/offices");
const carsRouter = require("./routes/cars");
const reservationsRouter = require("./routes/reservations");
const customersRouter = require("./routes/customers");
const paymentsRouter = require("./routes/payments");
app.use(cors());

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.get("/", (req, res) => {
  res.json({ message: "ok" });
});

app.use("/admins", adminsRouter);
app.use("/offices", officesRouter);
app.use("/cars", carsRouter);
app.use("/reservations", reservationsRouter);
app.use("/customers", customersRouter);
app.use("/payments", paymentsRouter);

/* Error handler middleware */
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });
  return;
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
