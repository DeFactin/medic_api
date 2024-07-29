const express = require('express')

const { registerUser } = require('../controllers/userController')

const router = express.Router()

// register route
router.post('/', registerUser)

module.exports = router