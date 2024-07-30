const Users = require('../models/usersModel')
const mongoose = require('mongoose')

const getUsers = async (req, res) => {
    const users = await Users.find({}).sort({ createdAt: -1 })

    res.status(200).json(users)
}

const getUser = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such user' })
    }

    const user = await Users.findById(id)

    if (!user) {
        return res.status(404).json({ error: 'No such user' })
    }

    res.status(200).json(user)
}

const deleteUser = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'No such user' })
    }

    const user = await Users.findOneAndDelete({ _id: id })

    if (!user) {
        return res.status(400).json({ error: 'No such user' })
    }

    res.status(200).json(user)
}

const updateUser = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'No such user' })
    }

    const user = await Users.findOneAndUpdate({ _id: id }, {
        ...req.body
    })

    if (!user) {
        return res.status(400).json({ error: 'No such user' })
    }

    res.status(200).json(user)
}


module.exports = {
    getUser,
    getUsers,
    deleteUser,
    updateUser
}