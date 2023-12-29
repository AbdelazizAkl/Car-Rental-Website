const express = require("express");
const router = express.Router();
const customersService = require("../services/customers");

router.post("/login", async (req, res) => {
  try {
    await customersService.login(req, res); // Call the login function
  } catch (error) {
    console.log(error);
  }
});



// GET a single car by ID
router.get("/:id", async (req, res) => {
  try {
    const customer = await customersService.getById(req.params.id);
    if (car) {
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
router.post("/signup", async (req, res) => {
  try {
    await customersService.create(req,res);
  } catch (error) {
    // Handle errors appropriately
    console.log(error);
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
