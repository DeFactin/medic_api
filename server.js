require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const usersRoutes = require('./routes/users')
const loginRoutes = require ('./routes/login')
const registerUser = require ('./routes/register')

const cors = require('cors')
// express app
const app = express()
app.use(cors({
  origin: '*'
}));
// middleware
app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
  })
  
//routes
app.use('/api/users',usersRoutes)

app.use('/api/login',loginRoutes)

app.use('/api/register',registerUser)


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
