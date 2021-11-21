const express = require("express");
const router = express.Router();

// @route GET /contacts
// @desc get all contacts
// @access Private

router.get('/', (req, res) => {
    res.send("Get all contacts")
});


// @route GET /contacts/:id
// @desc get one contact
// @access Private

router.get('/:id', (req, res) => {
    res.send("Get contact")
});


// @route POST /contacts
// @desc add new contact
// @access Private

router.post('/', (req, res) => {
    res.send("Added new contact")
});


// @route PUT /contacts/:id
// @desc update contact
// @access Private

router.put('/:id', (req, res) => {
    res.send("Change contact")
});


// @route DELETE /contacts/:id
// @desc remove contact
// @access Private

router.delete('/:id', (req, res) => {
    res.send("Remove contact")
});



module.exports = router;