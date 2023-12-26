const express = require('express');
const app = express();

// Import controllers
const carsController = require('./controllers/carsController');
const customersController = require('./controllers/customersController');
const reservationsController = require('./controllers/reservationsController');
const paymentsController = require('./controllers/paymentsController');
const officesController = require('./controllers/officesController');
const adminsController = require('./controllers/adminsController');

// Mount controllers on routes
app.use('/cars', carsController);
app.use('/customers', customersController);
app.use('/reservations', reservationsController);
app.use('/payments', paymentsController);
app.use('/offices', officesController);
app.use('/admins', adminsController);

app.get("/", (req, res) => {
    res.json({ message: "youssef" });
  });

// Other app logic (if needed)
// ...

// Start the server
app.listen(3000, () => {
  console.log('Server listening on port 3000');
});

