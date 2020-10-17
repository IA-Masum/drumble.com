const {body} = require('express-validator');
const User = require('../models/User')


const signUpValidator = [
    body('userName')
        .trim()
        .isLength({min: 2, max: 15}).withMessage('userName Must be Between 2 to 15 Characters!')
        .custom(async userName => {
            let user = await User.findOne({userName});
            if (user) {
                return Promise.reject('userName already exists!');
            }
        }),

    body('email')
        .not()
        .isEmpty().withMessage('Email Field should not be empty!')
        .isEmail().withMessage('Please Enter Valid Email!')
        .normalizeEmail()
        .custom(async email => {
            let user = await User.findOne({email});
            if (user) {
                return Promise.reject('Email already exists!');
            }
        })

    ,

    body('password')
        .isLength({min: 8}).withMessage('Password Must be minimum 8 Characters!'),

    body('confirmPassword')
        .isLength({min: 8}).withMessage('Password Must be minimum 8 Characters!')
        .custom((confirmPassword, {req}) => {
            if (confirmPassword !== req.body.password) {
                throw new Error('Passwords Didn\'t match!')
            }
            return true
        })
]


const logInValidator = [
    body('email')
        .not().isEmpty().withMessage('Email Should Not be Empty!')
        .isEmail().withMessage('Please Enter Valid Email!')
        .normalizeEmail(),

    body('password')
        .not().isEmpty().withMessage('Password Should Not be Empty!')
]


module.exports = {
    signUpValidator, logInValidator
}