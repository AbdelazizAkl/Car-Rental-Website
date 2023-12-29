const express = require("express");
const router = express.Router();
const customersService = require("../services/customers");

router.post("/login", async (req, res) => {
  try {
    console.log("sending request to services");
    await customersService.login(req, res); // Call the login function
  } catch (error) {
    console.log(error);
  }
});

// GET all cars (with pagination)
router.get("/", async (req, res) => {
  try {
    const { data, meta } = await customersService.getAll(req.query.page);

    res.json({ data, meta });
  } catch (error) {
    // Handle errors appropriately
    res.status(500).json({ error: "Failed to retrieve customers" });
  }
});

// GET a single car by ID
router.get("/:id", async (req, res) => {
  try {
    const customer = await customersService.getById(req.params.id);
    if (customer) {
      res.json(customer);
    } else {
      res.status(404).json({ error: "customer not found" });
    }
  } catch (error) {
    // Handle errors appropriately
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve customer" });
  }
});

// POST a new car
router.post("/", async (req, res) => {
  try {
    const customer = await customersService.create(
      req.body.fName,
      req.body.lName,
      req.body.email,
      req.body.password,
      req.body.address,
      req.body.phone,
      req.body.driversLiscense
    );
    res.status(201).json(customer);
  } catch (error) {
    // Handle errors appropriately
    console.log(error);
    res.status(400).json({ error: "Failed to create customer" });
  }
});

// DELETE an customer
router.delete("/:id", async (req, res) => {
  try {
    const success = await customersService.remove(req.params.id);
    console.log(success);
    if (success) {
      res.json({ message: "customer deleted" });
    } else {
      res.status(404).json({ error: "customer not found" });
    }
  } catch (error) {
    // Handle errors appropriately
    res.status(400).json({ error: "Failed to delete customer" });
  }
});

module.exports = router;
