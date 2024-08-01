const express = require('express');
const { logoutUser } = require('../controllers/userController');

const requireAuth = require('../middleware/requireAuthentification')

const router = express.Router()

router.use(requireAuth)
// logout route
router.post('/', logoutUser);

module.exports = router;
