const express = require ('express')
const {
    createUser,
    getUser,
    getUsers,
    deleteUser,
    updateUser
} = require("../controllers/archive")

const router = express.Router()

router.get('/',getUsers)

router.get('/details/:id',getUser)

router.post('/', createUser)
  
router.delete('/block/:id',deleteUser)

router.patch('/:id',updateUser)

module.exports = router