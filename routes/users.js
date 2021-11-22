const express = require("express");
const User = require("../models/User");
const {
    check,
    validationResult
} = require('express-validator');

const router = express.Router();



// @route  POST /users
// @desc Register user
// @access Public

router.post('/',
    check('name', 'name is required').not().isEmpty(),
    check('email', 'enter correct email').isEmail(),
    check('password', 'enter password with min. 6 characters').isLength({
        min: 6
    }),

    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            })
        }
        res.send('passed');

    }
)

module.exports = router;