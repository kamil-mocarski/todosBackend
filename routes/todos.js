const express = require("express");
const router = express.Router();

// @route GET /todos
// @desc get all todos
// @access Private

router.get('/', (req, res) => {
    res.send("Get all todos")
});


// @route GET /todos/:id
// @desc get one task
// @access Private

router.get('/:id', (req, res) => {
    res.send("Get task")
});


// @route POST /todos
// @desc add new task
// @access Private

router.post('/', (req, res) => {
    res.send("Added new task")
});


// @route PUT /todos/:id
// @desc update task
// @access Private

router.put('/:id', (req, res) => {
    res.send("Change task")
});


// @route DELETE /todos/:id
// @desc remove contact
// @access Private

router.delete('/:id', (req, res) => {
    res.send("Remove task")
});



module.exports = router;