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
router.get("/:id", async (req, res) => {
  try {
    const reservation = await reservationsService.getById(req.params.id);
    if (reservation) {
      res.json(reservation);
    } else {
      res.status(404).json({ error: "reservation not found" });
    }
  } catch (error) {
    // Handle errors appropriately
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve reservation" });
  }
});

// POST a new admin
router.post("/", async (req, res) => {
  try {
    const reservation = await reservationsService.create(
      req.body.id,
      req.body.customerId,
      req.body.carId,
      req.body.startDate,
      req.body.endDate,
      req.body.totalPrice,
      req.body.status,
      req.body.paymentDetails
    );
    res.status(201).json(reservation);
  } catch (error) {
    // Handle errors appropriately
    res.status(400).json({ error: "Failed to create reservation" });
  }
});

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
