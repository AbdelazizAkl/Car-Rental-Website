const express = require('express');
const router = express.Router();

const Reservations = require('../models/reservations');

// Get all reservations
router.get('/', async (req, res) => {
  try {
    const reservations = await Reservations.findAll();
    res.json(reservations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create a reservation
router.post('/', async (req, res) => {
    try {
      const newReservation = new Reservations(req.body);
      await newReservation.create();
      res.status(201).json(newReservation);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

// Get a reservation by ID
router.get('/:id', async (req, res) => {
  try {
    const reservation = await Reservations.findById(req.params.id);
    if (!reservation) {
      res.status(404).json({ error: 'Reservation not found' });
    } else {
      res.json(reservation);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a reservation
router.put('/:id', async (req, res) => {
  try {
    const updatedReservation = await Reservations.update(req.body, req.params.id);
    res.json(updatedReservation);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;


