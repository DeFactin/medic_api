const User = require('../models/usersModel')

// login a user
const loginUser = async (req, res) => {
  res.json({mssg: 'login user'})
}

// signup a user
const registerUser = async (req, res) => {
  const {username, password, name, orders, image, birthdate} = req.body

  try {
    const user = await User.signup(username, password, name, orders, image, birthdate)

    res.status(200).json({username, password, name, orders, image, birthdate})
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}


module.exports = { loginUser, registerUser }