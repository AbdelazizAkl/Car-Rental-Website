const express = require('express');
const router = express.Router();

const Customers = require('../models/customers');

// Get all customers
router.get('/', async (req, res) => {
  try {
    const customers = await Customers.findAll();
    res.json(customers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create a customer
router.post('/', async (req, res) => {
  try {
    const newCustomer = new Customers(req.body);
    await newCustomer.create();
    res.status(201).json(newCustomer);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get a customer by ID
router.get('/:id', async (req, res) => {
  try {
    const customer = await Customers.findById(req.params.id);
    if (!customer) {
      res.status(404).json({ error: 'Customer not found' });
    } else {
      res.json(customer);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a customer
router.put('/:id', async (req, res) => {
  try {
    const updatedCustomer = await Customers.update(req.body, req.params.id);
    res.json(updatedCustomer);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a customer
router.delete('/:id', async (req, res) => {
  try {
    await Customers.delete(req.params.id);
    res.json({ message: 'Customer deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
