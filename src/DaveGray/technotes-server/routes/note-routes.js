const express = require('express');
const router = express.Router();
const notesController = require('../controllers/notes-controller');
const verifyJwt = require('../middlewares/verify-jwt');

router.use(verifyJwt);

router.route('/')
    .get(notesController.getAllNotes)
    .post(notesController.createNote)
    .patch(notesController.updateNote)
    .delete(notesController.deleteNote);

module.exports = router;