const express = require('express');
const router = express.Router();

const Admins = require('../models/admins');

// Create an admin
router.post('/', async (req, res) => {
  try {
    const newAdmin = new Admins(req.body);
    await newAdmin.create();
    res.json({ message: 'admin cannot be created' });
} catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;