const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const Schema = mongoose.Schema
const validator = require('validator')

const userSchema = new Schema({
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
        default: Date.now,
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

// login method
userSchema.statics.login = async function (username, password) {

    if (!username || !password) {
        throw Error('All fields must be filled')
    }

    const user = await this.findOne({ username })
    if (!user) {
        throw Error('Incorrect username')
    }

    if (user.status !== 'active') {
        throw Error('Access denied. You are blocked.')
    }

    if (user.role !== 'Admin') {
        throw Error('Access denied. Only Admin Users allowed.')
    }

    const match = await bcrypt.compare(password, user.password)
    if (!match) {
        throw Error('Incorrect password')
    }

    return user
}

userSchema.statics.logoutUser = async function (username) {
    try {
        const user = await this.findOne({ username });
        if (!user) {
            throw new Error('User not found');
        }
        user.lastlog = new Date();
        await user.save();
        console.log(`Last log updated for user ${username}`);
        return user;
    } catch (error) {
        console.error('Error updating last log:', error);
        throw error;
    }
}



module.exports = mongoose.model('User', userSchema)