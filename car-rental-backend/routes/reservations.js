const express = require("express");
const router = express.Router();
const reservationsService = require("../services/reservations");

// GET all admins (with pagination)
router.get("/", async (req, res) => {
  try {
    const { data, meta } = await reservationsService.getAll(req.query.page);
    res.json({ data, meta });
  } catch (error) {
    // Handle errors appropriately
    res.status(500).json({ error: "Failed to retrieve reservations" });
  }
});

// GET a single admin by ID

router.post("/getById", async (req, res) => {
  try {
    await reservationsService.getById(req, res);
  } catch (error) {
    console.log("Error in search route:");
    return res.json({ success: false, message: "Failed to retrieve cars" });
  }
});
router.post("/getByCustomerId", async (req, res) => {
  try {
    await reservationsService.getByCustomerId(req, res);
  } catch (error) {
    console.log("Error in search route:");
    return res.json({ success: false, message: "Failed to retrieve cars" });
  }
});
router.post("/getByStartDate", async (req, res) => {
  try {
    await reservationsService.getByStartDate(req, res);
  } catch (error) {
    console.log("Error in search route:");
    return res.json({ success: false, message: "Failed to retrieve cars" });
  }
});
router.post("/getByEndDate", async (req, res) => {
  try {
    await reservationsService.getByEndDate(req, res);
  } catch (error) {
    console.log("Error in search route:");
    return res.json({ success: false, message: "Failed to retrieve cars" });
  }
});
router.post("/getByReservationDate", async (req, res) => {
  try {
    await reservationsService.getByReservationDate(req, res);
  } catch (error) {
    console.log("Error in search route:");
    return res.json({ success: false, message: "Failed to retrieve cars" });
  }
});
router.post("/getByAmountPaid", async (req, res) => {
  try {
    await reservationsService.getByAmountPaid(req, res);
  } catch (error) {
    console.log("Error in search route:");
    return res.json({ success: false, message: "Failed to retrieve cars" });
  }
});
router.post("/getByTotalPrice", async (req, res) => {
  try {
    await reservationsService.getByTotalPrice(req, res);
  } catch (error) {
    console.log("Error in search route:");
    return res.json({ success: false, message: "Failed to retrieve cars" });
  }
});
router.post("/getByStatus", async (req, res) => {
  try {
    await reservationsService.getByStatus(req, res);
  } catch (error) {
    console.log("Error in search route:");
    return res.json({ success: false, message: "Failed to retrieve cars" });
  }
});

router.post("/getCarsStatus", async (req, res) => {
  try {
    await carsService.getStatus(req, res);
  } catch (error) {
    // Handle errors appropriately
  }
});

router.post("/getReservationsByCustomer", async (req, res) => {
  try {
    await reservationsService.getReservationsByCustomer(req, res);
  } catch (error) {
    console.log("Error in search route:");
    return res.json({ success: false, message: "Failed to retrieve cars" });
  }
});

router.post("/getAllByDate", async (req, res) => {
  try {
    await reservationsService.getAllByDate(req, res);
  } catch (error) {
    console.log("Error in search route:");
    return res.json({ success: false, message: "Failed to retrieve cars" });
  }
});

router.post("/getAllByCarId", async (req, res) => {
  try {
    await reservationsService.getAllByCarId(req, res);
  } catch (error) {
    console.log("Error in search route:");
    return res.json({ success: false, message: "Failed to retrieve cars" });
  }
});

router.post("/getAllByCarId", async (req, res) => {
  try {
    await reservationsService.getAllByCarId(req, res);
  } catch (error) {
    console.log("Error in search route:");
    return res.json({ success: false, message: "Failed to retrieve cars" });
  }
});

// POST a new admin
router.post("/reserve", async (req, res) => {
  try {
    await reservationsService.create(req, res);
  } catch (error) {
    // Handle errors appropriately
    console.log(error);
  }
});

router.post("/cancel"),
  async (req, res) => {
    try {
      await reservationsService.cancelReservation(req.res);
    } catch (error) {
      console.log(error);
    }
  };

// DELETE an admin
router.delete("/:id", async (req, res) => {
  try {
    const success = await reservationsService.remove(req.params.id);
    console.log(success);
    if (success) {
      res.json({ message: "reservation canceled" });
    } else {
      res.status(404).json({ error: "reservation not found" });
    }
  } catch (error) {
    // Handle errors appropriately
    console.log(error);
    res.status(400).json({ error: "Failed to cancel reservation" });
  }
});

module.exports = router;
