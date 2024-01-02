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
router.post("/getById", async (req, res) => {
  try {
    await carsService.getById(req, res);
  } catch (error) {
    console.log("Error in search route:");
    return res.json({ success: false, message: "Failed to retrieve cars" });
  }
});

router.post("/getByBrand", async (req, res) => {
  try {
    await carsService.getByBrand(req, res);
  } catch (error) {
    console.log("Error in search route:");
    return res.json({ success: false, message: "Failed to retrieve cars" });
  }
});
router.post("/getByModel", async (req, res) => {
  try {
    await carsService.getByModel(req, res);
  } catch (error) {
    console.log("Error in search route:");
    return res.json({ success: false, message: "Failed to retrieve cars" });
  }
});
router.post("/getByYear", async (req, res) => {
  try {
    await carsService.getByYear(req, res);
  } catch (error) {
    console.log("Error in search route:");
    return res.json({ success: false, message: "Failed to retrieve cars" });
  }
});
router.post("/getByColor", async (req, res) => {
  try {
    await carsService.getByColor(req, res);
  } catch (error) {
    console.log("Error in search route:");
    return res.json({ success: false, message: "Failed to retrieve cars" });
  }
});
router.post("/getByPlateId", async (req, res) => {
  try {
    await carsService.getByPlateId(req, res);
  } catch (error) {
    console.log("Error in search route:");
    return res.json({ success: false, message: "Failed to retrieve cars" });
  }
});
router.post("/getByStatus", async (req, res) => {
  try {
    await carsService.getByStatus(req, res);
  } catch (error) {
    console.log("Error in search route:");
    return res.json({ success: false, message: "Failed to retrieve cars" });
  }
});
router.post("/getByOfficeId", async (req, res) => {
  try {
    await carsService.getByOfficeId(req, res);
  } catch (error) {
    console.log("Error in search route:");
    return res.json({ success: false, message: "Failed to retrieve cars" });
  }
});
router.post("/getByDailyPrice", async (req, res) => {
  try {
    await carsService.getByDailyPrice(req, res);
  } catch (error) {
    console.log("Error in search route:");
    return res.json({ success: false, message: "Failed to retrieve cars" });
  }
});
router.post("/getByWeeklyPrice", async (req, res) => {
  try {
    await carsService.getByWeeklyPrice(req, res);
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
router.post("/getById", async (req, res) => {
  try {
    await carsService.getById(req, res);
  } catch (error) {
    console.log("Error in search route:");
    return res.json({ success: false, message: "Failed to retrieve cars" });
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
    await carsService.create(req, res);
  } catch (error) {
    // Handle errors appropriatelys
    res.json({ success: false, message: "Failed to create car (router)" });
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
router.post("/active", async (req, res) => {
  try {
    await carsService.setActive(req, res);
  } catch (error) {
    console.log("Error in search route:");
    return res.json({ success: false, message: "Failed to retrieve cars" });
  }
});
router.post("/OutOfService", async (req, res) => {
  try {
    await carsService.setOutService(req, res);
  } catch (error) {
    console.log("Error in search route:");
    return res.json({ success: false, message: "Failed to retrieve cars" });
  }
});

module.exports = router;
