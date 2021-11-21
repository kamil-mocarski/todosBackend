const express = require("express");
const router = express.Router();

// @route GET /auth
// @desc Get logged in user
// @access Private

router.get('/', (req, res) => {
    res.send("Get logged user")
});

// @route POST /auth
// @desc Auth user & get token
// access Public

router.post('/', (req, res) => {
    res.send('Log in user')
})

module.exports = router;