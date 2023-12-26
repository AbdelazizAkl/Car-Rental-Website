const express = require('express');
const router = express.Router();

const Cars = require('../models/cars');

// Get all cars
router.get('/', async (req, res) => {
  try {
    const cars = await Cars.findAll();
    res.json(cars);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create a car
router.post('/', async (req, res) => {
  try {
    const newCar = new Cars(req.body);
    await newCar.create();
    res.status(201).json(newCar);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get a car by ID
router.get('/:id', async (req, res) => {
  try {
    const car = await Cars.findById(req.params.id);
    if (!car) {
      res.status(404).json({ error: 'Car not found' });
    } else {
      res.json(car);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a car
router.put('/:id', async (req, res) => {
  try {
    const updatedCar = await Cars.update(req.body, req.params.id);
    res.json(updatedCar);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a car
router.delete('/:id', async (req, res) => {
  try {
    await Cars.delete(req.params.id);
    res.json({ message: 'Car deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
