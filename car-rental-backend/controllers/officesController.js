const express = require('express');
const router = express.Router();

const Offices = require('../models/offices');

// Get all offices
router.get('/', async (req, res) => {
  try {
    const offices = await Offices.findAll();
    res.json(offices);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create an office
router.post('/', async (req, res) => {
  try {
    const newOffice = new Offices(req.body);
    await newOffice.create();
    res.status(201).json(newOffice);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get an office by ID
router.get('/:id', async (req, res) => {
  try {
    const office = await Offices.findById(req.params.id);
    if (!office) {
      res.status(404).json({ error: 'Office not found' });
    } else {
      res.json(office);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update an office
router.put('/:id', async (req, res) => {
  try {
    const updatedOffice = await Offices.update(req.body, req.params.id);
    res.json(updatedOffice);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete an office
router.delete('/:id', async (req, res) => {
  try {
    await Offices.delete(req.params.id);
    res.json({ message: 'Office deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
