const User = require('../models/user');
const Note = require('../models/note');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');

// @desc Get all users
// @route GET /users
// @access Private
const getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find().select('-password').lean();

    if (!users?.length) {
        return res.status(400).json({message: 'No users found'});
    }

    res.json(users);
});

// @desc Get a user by id
// @route GET /users/id
// @access Private
const getUserById = asyncHandler(async (req, res) => {
    const {id} = req.body;
    if (!id) {
        return res.status(400).json({message: 'User ID is required'});
    }

    const user = await User.findById(id).exec();
    if (!user) {
        return res.status(404).json({message: 'User not found'});
    }

    res.json(user);
});

// @desc Create a new user
// @route POST /users
// @access Private
const createUser = asyncHandler(async (req, res) => {
    const {username, password, roles} = req.body;

    // Validate data
    if (!username || !password || !Array.isArray(roles) || !roles.length) {
        return res.status(400).json({message: 'All fields are required'});
    }

    // Check for duplicate
    const duplicate = await User.findOne({username}).lean().exec();

    if (duplicate) {
        return res.status(409).json({message: 'Duplicate username'});
    }

    // Hash password
    const hashedPwd = await bcrypt.hash(password, 10); // salt rounds

    // Create and store user
    const userData = {
        username: username,
        password: hashedPwd,
        roles: roles
    };
    const user = await User.create(userData);

    if (user) {
        res.status(201).json({message: `New user ${username} created`});
    } else {
        res.status(400).json({message: 'Invalid user data received'});
    }
});

// @desc Update an existing user
// @route PATCH /users
// @access Private
const updateUser = asyncHandler(async (req, res) => {
    const {id, username, roles, active, password} = req.body;

    // Validate data
    if (!id || !username || !Array.isArray(roles) || !roles.length || typeof active !== 'boolean') {
        return res.status(400).json({message: 'All fields are required'});
    }

    // Get existing user by id
    const user = await User.findById(id).exec();

    if (!user) {
        return res.status(400).json({message: 'User not found'});
    }

    // Check for duplicate
    const duplicate = await User.findOne({username}).lean().exec();

    // Make sure we are updating the original user
    if (duplicate && duplicate?._id.toString() !== id) {
        return res.status(409).json({message: 'Duplicate username'});
    }

    user.username = username;
    user.roles = roles;
    user.active = active;

    if (password) {
        // Hash password
        user.password = await bcrypt.hash(password, 10);    // Salt rounds
    }

    // Save changes
    const updatedUser = await user.save();

    res.json({message: `User ${updatedUser.username} updated`});
});

// @desc Delete an existing user
// @route DELETE /users
// @access Private
const deleteUser = asyncHandler(async (req, res) => {
    const {id} = req.body;
    
    if (!id) {
        return res.status(400).json({message: 'User ID is required'});
    }

    // Do not delete user if he has notes
    const note = await Note.findOne({user: id}).lean().exec();

    if (note) {
        return res.status(400).json({message: 'User has assigned notes'});
    }

    // Find and delete user
    const user = await User.findById(id).exec();

    if (!user) {
        return res.status(404).json({message: 'User not found'});
    }

    const result = await user.deleteOne();
    const reply = `User ${result.username} with ID ${id} is deleted`;

    res.json({message: reply});
});

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
}