const express = require("express");
const router = express.Router();
const paymentsService = require("../services/payments");

// GET all cars (with pagination)
router.get("/", async (req, res) => {
  try {
    const { data, meta } = await paymentsService.getAll(req.query.page);
    res.json({ data, meta });
  } catch (error) {
    // Handle errors appropriately
    res.status(500).json({ error: "Failed to retrieve payments" });
  }
});

// GET a single payment by ID
router.get("/:id", async (req, res) => {
  try {
    const payment = await paymentsService.getById(req.params.id);
    if (payment) {
      res.json(payment);
    } else {
      res.status(404).json({ error: "payment not found" });
    }
  } catch (error) {
    // Handle errors appropriately
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve payment" });
  }
});

// POST a new payment
router.post("/", async (req, res) => {
  try {
    const payment = await paymentsService.create(
      req.body.reservationId,
      req.body.amount,
      req.body.paymentMethod,
      req.body.transactionId,
      req.body.date
    );
    res.status(201).json(payment);
  } catch (error) {
    // Handle errors appropriately
    console.log(error);
    res.status(400).json({ error: "Failed to create payment" });
  }
});

// DELETE an customer
router.delete("/:id", async (req, res) => {
  try {
    const success = await paymentsService.remove(req.params.id);
    console.log(success);
    if (success) {
      res.json({ message: "payment deleted" });
    } else {
      res.status(404).json({ error: "payment not found" });
    }
  } catch (error) {
    // Handle errors appropriately
    res.status(400).json({ error: "Failed to delete payment" });
  }
});

module.exports = router;
