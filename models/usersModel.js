const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const Schema = mongoose.Schema
const validator = require('validator')

const userSchema = new Schema({
    id: {
        type: String,
        required: false
    },
    username: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'Employee',
        required: false
    },
    password: {
        type: String,
        required: true
    },
    orders: {
        type: Number,
        required: true
    },
    lastlog: {
        type: Date,
        required: false
    },
    image: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: 'active',
        required: false
    },
    birthdate: {
        type: Date,
        required: true
    }
})

// signup method
userSchema.statics.signup = async function (username, password, name, orders, image, birthdate) {


    //validation
    if (!username || !password || !name || !orders || !image || !birthdate) {
        throw Error('All fields must be filled')
    }

    const exists = await this.findOne({ username })
    if (exists) {
        throw Error('Username already in use')
    }

    if (!validator.isStrongPassword(password)) {
        throw Error('Password not strong enough')
    }


    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({ username, password: hash, name, orders, image, birthdate })

    return user
}


module.exports = mongoose.model('User', userSchema)