const express = require("express");
const router = express.Router();
const officesService = require("../services/offices");

// GET all admins (with pagination)
router.get("/", async (req, res) => {
  try {
    const { data, meta } = await officesService.getAll(req.query.page);
    res.json({ data, meta });
  } catch (error) {
    // Handle errors appropriately
    res.status(500).json({ error: "Failed to retrieve offices" });
  }
});

// GET a single admin by ID
router.get("/:id", async (req, res) => {
  try {
    const office = await officesService.getById(req.params.id);
    if (office) {
      res.json(office);
    } else {
      res.status(404).json({ error: "office not found" });
    }
  } catch (error) {
    // Handle errors appropriately
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve office" });
  }
});

// POST a new admin
router.post("/", async (req, res) => {
  try {
    const office = await officesService.create(
      req.body.name,
      req.body.city,
      req.body.address,
      req.body.phone,
      req.body.hoursOperation
    );
    res.status(201).json(office);
  } catch (error) {
    // Handle errors appropriately
    res.status(400).json({ error: "Failed to create office" });
  }
});

// DELETE an admin
router.delete("/:id", async (req, res) => {
  try {
    const success = await officesService.remove(req.params.id);
    console.log(success);
    if (success) {
      res.json({ message: "office deleted" });
    } else {
      res.status(404).json({ error: "office not found" });
    }
  } catch (error) {
    // Handle errors appropriately
    console.log(error);
    res.status(400).json({ error: "Failed to delete office" });
  }
});

module.exports = router;
