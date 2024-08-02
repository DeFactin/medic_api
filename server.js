require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const usersRoutes = require('./routes/users')
const loginRoute = require('./routes/login')
const logoutRoute = require('./routes/logout')
const registerUser = require('./routes/register')

const cors = require('cors')
// express app
const app = express()
app.use(cors({
  origin: 'https://mediclab-web.vercel.app/', // Replace with your frontend URL
  methods: 'GET,POST,PUT,DELETE', // Allow necessary methods
  credentials: true // If you need to send cookies or auth headers
}));
// middleware
app.use(express.json())

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

//routes

app.get('/', (req, res) => {
  res.send('Hello from the API!');
});

app.use('/users', usersRoutes)

app.use('/login', loginRoute)

app.use('/register', registerUser)

app.use('/logout', logoutRoute)

// connect to db
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('connected to database')
    app.listen(process.env.PORT, () => {
      console.log('listening for requests on port', process.env.PORT)
    })
  })
  .catch((err) => {
    console.log(err)
  })

  module.exports = app;