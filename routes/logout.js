const express = require('express');
const { logoutUser } = require('../controllers/userController');

const router = express.Router();

// logout route
router.post('/', logoutUser);

module.exports = router;
