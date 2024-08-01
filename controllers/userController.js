const User = require('../models/usersModel')
const jwt = require('jsonwebtoken')

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '1d' })
}

// login a user
const loginUser = async (req, res) => {
  const { username, password } = req.body

  try {

    const user = await User.login(username, password)
    
    // create a token
    const token = createToken(user._id)

    res.status(200).json({ username, token })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// signup a user
const registerUser = async (req, res) => {
  const { username, password, name, orders, image, birthdate } = req.body

  if (orders < 0 || orders > 10) {
    return res.status(400).json({ error: 'Orders must be between 0 and 10' });
  }

  try {
    const user = await User.signup(username, password, name, orders, image, birthdate)

    //creating json web token
    const token = createToken(user._id)

    res.status(200).json({ username, token })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

//logout
const logoutUser = async (req, res) => {
  const { username } = req.body;

  if (!username) {
    return res.status(400).json({ error: 'Username is required' });
  }

  try {
    const user = await User.logoutUser(username);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ message: 'Logout successful', username });
  } catch (error) {
    console.error('Error during logout:', error);
    res.status(500).json({ error: error.message });
  }
};




module.exports = { loginUser, registerUser, logoutUser }