const User = require('../models/user');
const Note = require('../models/note');
const asyncHandler = require('express-async-handler');

// @desc Get all notes
// @route GET /notes
// @access Private
const getAllNotes = asyncHandler(async (req, res) => {
    // Get all notes from the database
    const notes = await Note.find().lean();

    // Check if no notes
    if (!notes?.length) {
        return res.status(404).json({message: 'No notes found'});
    }

    // Add username to each note before sending the response to client
    // We can also do this with a for...of loop.
    // See Promise.all() with map() here: https://youtu.be/4lqJBBEpjRE
    const notesWithUser = await Promise.all(notes.map(async (note) => {
        const user = await User.findById(note.user).lean().exec();
        return {...note, username: user.username};
    }));

    return res.json(notesWithUser);
});

// @desc Create new note
// @route POST /notes
// @access Private
const createNote = asyncHandler(async (req, res) => {
    const {user, title, text} = req.body;

    // Validate data
    if (!user || !title || !text) {
        return res.status(400).json({message: 'All fields are required'});
    }

    // Check for the duplicate title
    const duplicate = await Note.findOne({title}).lean().exec();

    if (duplicate) {
        return res.status(409).json({message: 'Duplicate note title'});
    }

    // Crate and store the note
    const note = await Note.create({user, title, text});

    if (note) {
        return res.status(201).json({message: 'New note created'});
    } else {
        return res.status(400).json({message: 'Invalid note data received'});
    }
});

// @desc Update existing note
// @route PATCH /notes
// @access Private
const updateNote = asyncHandler(async (req, res) => {
    const {id, user, title, text, completed} = req.body;

    // Validate data
    if (!id || !user || !title || !text || typeof completed !== 'boolean') {
        return res.status(400).json({message: 'All fields are required'});
    }

    // Confirm note exists to update
    const note = await Note.findById(id).exec();

    if (!note) {
        return res.status(404).json({message: 'Note not found'});
    }

    // Check for duplicate title
    const duplicate = await Note.findOne({title}).lean().exec();

    if (duplicate && duplicate?._id.toString() !== id) {
        return res.status(409).json({message: 'Duplicate note title'});
    }

    note.user = user;
    note.title = title;
    note.text = text;
    note.completed = completed;

    const updatedNote = await note.save();

    res.json({message: `Note ${updatedNote.title} updated`});
});

// @desc Delete existing note
// @route DELETE /notes
// @access Private
const deleteNote = asyncHandler(async (req, res) => {
    const {id} = req.body;

    // Validate user input
    if (!id) {
        return res.status(400).json({message: 'Note ID is required'});
    }

    // Confirm note exists to delete
    const note = await Note.findById(id).exec();

    if (!note) {
        return res.status(404).json({message: 'Note not found'});
    }

    // Delete note
    const result = await note.delete();
    const reply = `Note ${result.title} with ID ${result._id} is deleted`;

    res.json({message: reply});
});

module.exports = {
    getAllNotes,
    createNote,
    updateNote,
    deleteNote
}