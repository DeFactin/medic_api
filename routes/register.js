const express = require('express')

const { registerUser } = require('../controllers/userController')

const requireAuth = require('../middleware/requireAuthentification')

const router = express.Router()

router.use(requireAuth)
// register route
router.post('/', registerUser)

module.exports = router