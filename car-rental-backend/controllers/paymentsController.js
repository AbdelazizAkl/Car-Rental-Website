const express = require('express');
const router = express.Router();

const Payments = require('../models/payments');

// Get all payments
router.get('/', async (req, res) => {
  try {
    const payments = await Payments.findAll();
    res.json(payments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add a payment
router.post('/', async (req, res) => {
  try {
    const newPayment = new Payments(req.body);
    await newPayment.add();
    res.status(201).json(newPayment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get a payment by ID
router.get('/:id', async (req, res) => {
  try {
    const payment = await Payments.findById(req.params.id);
    if (!payment) {
      res.status(404).json({ error: 'Payment not found' });
    } else {
      res.json(payment);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a payment (not supported by your provided model)
// ... implement specific update logic if needed

// Delete a payment
router.delete('/:id', async (req, res) => {
  try {
    await Payments.delete(req.params.id);
    res.json({ message: 'Payment deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
