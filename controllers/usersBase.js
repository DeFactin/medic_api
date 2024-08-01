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
    const { id } = req.params;
    const updateData = req.body;

    if (updateData.orders < 0 || updateData.orders > 10) {
        return res.status(400).json({ error: 'Orders must be between 0 and 10' });
    }
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
        console.error('Invalid user ID');
        return res.status(400).json({ error: 'No such user' });
    }

    try {
        const user = await Users.findOneAndUpdate({ _id: id }, updateData, { new: true, runValidators: true });

        if (!user) {
            console.error('User not found');
            return res.status(404).json({ error: 'No such user' });
        }

        res.status(200).json(user);
    } catch (error) {
        console.error('Update failed:', error.message);
        res.status(500).json({ error: 'Update failed' });
    }
}


const blockUser = async (req, res) => {
    const { id } = req.params;

    try {

        const user = await Users.findById(id);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // toggling the status based on the current status
        const newStatus = user.status === 'blocked' ? 'active' : 'blocked';

        // Update the user's status
        user.status = newStatus;
        await user.save();

        res.status(200).json({ message: `User status updated to ${newStatus}`, user });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred' });
    }
};




module.exports = {
    getUser,
    getUsers,
    deleteUser,
    updateUser,
    blockUser
}