const express = require('express');
const router = express.Router();
const notesController = require('../controllers/notes-controller');

router.route('/')
    .get(notesController.getAllNotes)
    .post(notesController.createNote)
    .patch(notesController.updateNote)
    .delete(notesController.deleteNote);

module.exports = router;