const express = require('express')
const {
    getUser,
    getUsers,
    deleteUser,
    updateUser,
    blockUser
} = require("../controllers/usersBase")

const requireAuth = require('../middleware/requireAuthentification')

const router = express.Router()

router.use(requireAuth)

router.get('/', getUsers)

router.get('/details/:id', getUser)

router.put('/block/:id', blockUser)

router.put('/update/:id', updateUser)

module.exports = router