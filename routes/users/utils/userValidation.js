const { check } = require('express-validator');

const userValidation = [
    check('name', 'Name is required').not().isEmpty(), 
    check('email', 'Please include a valid-email').isEmail(),
    check('password', 'Please create password of 3 or more characters').isLength({ min: 3 })
];

module.exports = userValidation;