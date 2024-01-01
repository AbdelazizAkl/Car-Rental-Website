const express = require("express");
const router = express.Router();
const adminsService = require("../services/admins");
const carsService = require("../services/cars");
const reservationsService = require("../services/reservations");

router.post("/login", async (req, res) => {
  try {
    console.log("sending request to services");
    await adminsService.login(req, res); // Call the login function
  } catch (error) {
    console.log(error);
  }
});

// GET all admins (with pagination)
router.get("/", async (req, res) => {
  try {
    const { data, meta } = await adminsService.getAll(req.query.page);
    res.json({ data, meta });
  } catch (error) {
    // Handle errors appropriately
    res.status(500).json({ error: "Failed to retrieve admins" });
  }
});

// GET a single admin by ID
router.get("/:id", async (req, res) => {
  try {
    const admin = await adminsService.getById(req.params.id);
    if (admin) {
      res.json(admin);
    } else {
      res.status(404).json({ error: "Admin not found" });
    }
  } catch (error) {
    // Handle errors appropriately
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve admin" });
  }
});

// POST a new admin
router.post("/", async (req, res) => {
  try {
    const admin = await adminsService.create(req.body.email, req.body.password);
    res.status(201).json(admin);
  } catch (error) {
    // Handle errors appropriately
    res.status(400).json({ error: "Failed to create admin" });
  }
});

// DELETE an admin
router.delete("/:id", async (req, res) => {
  try {
    const success = await adminsService.remove(req.params.id);
    console.log(success);
    if (success) {
      res.json({ message: "Admin deleted" });
    } else {
      res.status(404).json({ error: "Admin not found" });
    }
  } catch (error) {
    // Handle errors appropriately
    res.status(400).json({ error: "Failed to delete admin" });
  }
});

module.exports = router;
