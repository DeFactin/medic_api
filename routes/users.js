const express = require ('express')
const {
    getUser,
    getUsers,
    deleteUser,
    updateUser
} = require("../controllers/usersBase")

const requireAuth = require('../middleware/requireAuthentification')

const router = express.Router()

router.use(requireAuth)

router.get('/',getUsers)

router.get('/details/:id',getUser)
  
router.delete('/block/:id',deleteUser)

router.patch('/:id',updateUser)

module.exports = router