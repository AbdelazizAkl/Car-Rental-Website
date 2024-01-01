const express = require("express");
const router = express.Router();
const customersService = require("../services/customers");

// GET all cars (with pagination)
router.post("/login", async (req, res) => {
  try {
    console.log("sending request to services");
    await customersService.login(req, res); // Call the login function
  } catch (error) {
    console.log(error);
  }
});
router.post("/getById", async (req, res) => {
  try {
    await customersService.getById(req, res);
  } catch (error) {
    console.log("Error in search route:");
    return res.json({ success: false, message: "Failed to retrieve cars" });
  }
});
router.post("/getByFirstName", async (req, res) => {
  try {
    await customersService.getByFirstName(req, res);
  } catch (error) {
    console.log("Error in search route:");
    return res.json({ success: false, message: "Failed to retrieve cars" });
  }
});
router.post("/getByLastName", async (req, res) => {
  try {
    await customersService.getByLastName(req, res);
  } catch (error) {
    console.log("Error in search route:");
    return res.json({ success: false, message: "Failed to retrieve cars" });
  }
});
router.post("/getByEmail", async (req, res) => {
  try {
    await customersService.getByEmail(req, res);
  } catch (error) {
    console.log("Error in search route:");
    return res.json({ success: false, message: "Failed to retrieve cars" });
  }
});
router.post("/getByAddress", async (req, res) => {
  try {
    await customersService.getByAddress(req, res);
  } catch (error) {
    console.log("Error in search route:");
    return res.json({ success: false, message: "Failed to retrieve cars" });
  }
});
router.post("/getByPhone", async (req, res) => {
  try {
    await customersService.getByPhone(req, res);
  } catch (error) {
    console.log("Error in search route:");
    return res.json({ success: false, message: "Failed to retrieve cars" });
  }
});
router.post("/getByPassportNumber", async (req, res) => {
  try {
    await customersService.getByPassportNumber(req, res);
  } catch (error) {
    console.log("Error in search route:");
    return res.json({ success: false, message: "Failed to retrieve cars" });
  }
});

// GET a single car by ID
router.get("/:id", async (req, res) => {
  try {
    const customer = await customersService.getById(req.params.id);
    if (e) {
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
    await customersService.create(req, res);
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
