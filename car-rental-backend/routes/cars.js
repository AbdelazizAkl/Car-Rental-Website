const express = require("express");
const router = express.Router();
const carsService = require("../services/cars");

// GET all cars (with pagination)
router.post("/search", async (req, res) => {
  try {
    await carsService.getByFilters(req, res);
  } catch (error) {
    console.log("Error in search route:");
    return res.json({ success: false, message: "Failed to retrieve cars" });
  }
});

router.get("/", async (req, res) => {
  try {
    const { data, meta } = await carsService.getAll(req.query.page);
    res.json({ data, meta });
  } catch (error) {
    // Handle errors appropriately
    res.status(500).json({ error: "Failed to retrieve cars" });
  }
});

// GET a single car by ID
router.get("/:id", async (req, res) => {
  try {
    await carsService.getById(req, res);
  } catch (error) {
    // Handle errors appropriately
    console.error("Error in route handler:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to retrieve cars" });
  }
});

router.get("/:year", async (req, res) => {
  try {
    await carsService.getByYear(req, res);
  } catch (error) {
    // Handle errors appropriately
    console.error("Error in route handler:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to retrieve cars" });
  }
});

// POST a new car
router.post("/", async (req, res) => {
  try {
    const car = await carsService.create(
      req.body.model,
      req.body.year,
      req.body.plateId,
      req.body.status,
      req.body.office_id,
      req.body.images,
      req.body.dailyPrice,
      req.body.weeklyPrice,
      req.body.mileage,
      req.body.features
    );
    res.status(201).json(car);
  } catch (error) {
    // Handle errors appropriately
    console.log(error);
    res.status(400).json({ error: "Failed to create car" });
  }
});

// DELETE an car
router.delete("/:id", async (req, res) => {
  try {
    const success = await carsService.remove(req.params.id);
    console.log(success);
    if (success) {
      res.json({ message: "car deleted" });
    } else {
      res.status(404).json({ error: "car not found" });
    }
  } catch (error) {
    // Handle errors appropriately
    res.status(400).json({ error: "Failed to delete car" });
  }
});

module.exports = router;
