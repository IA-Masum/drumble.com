const bcrypt = require('bcrypt')
const {validationResult} = require('express-validator');


const User = require('../models/User')

const validatorMessageFormatter = require('../utils/validatorMessageFormatter');


const getSignUpPage = (req, res, next) => {

    res.render('pages/auth/signUp.ejs', {pageTitle: "Create New Account", errors: {}, values: {}})

}


const signUp = async (req, res, next) => {

    let {userName, email, password} = req.body

    let errors = validationResult(req).formatWith(validatorMessageFormatter)

    if (!errors.isEmpty()) {
        return res.render('pages/auth/signUp.ejs', {
            pageTitle: "Create New Account",
            errors: errors.mapped(),
            values: {userName, email, password}
        })
    }


    try {

        let hashedPassword = await bcrypt.hash(password, 11)

        let user = new User({userName, email, password: hashedPassword})

        let createdUser = await user.save()
        console.log('User Created Successful!', createdUser)
        res.render('pages/auth/signUp.ejs', {pageTitle: "Create New Account", errors: {}, values: {}})

    } catch (e) {

        console.log(e)
        next(e)
    }
}

const getLoginPage = (req, res, next) => {

    res.render('pages/auth/login.ejs', {pageTitle: 'Log In', errors: {}});

}


const login = async (req, res, next) => {

    let {email, password} = req.body

    let errors = validationResult(req).formatWith(validatorMessageFormatter)

    if (!errors.isEmpty()) {
        return res.render('pages/auth/login.ejs', {pageTitle: 'Log In', errors: errors.mapped()});
    }

    try {

        let user = await User.findOne({email})
        let match = false;
        if (user) {
            match = await bcrypt.compare(password, user.password)
        }

        if (!user || !match) {
            return res.render('pages/auth/login.ejs', {
                pageTitle: 'Log In', errors: {
                    email: "Invalid Information!", password: "Invalid Information!"
                }
            });
        }


        res.render('pages/auth/login.ejs', {pageTitle: 'Log In', errors:{}});

    } catch (e) {
        console.log(e)
        next(e)
    }

}

const logout = (req, res, next) => {

}

module.exports = {getSignUpPage, signUp, getLoginPage, login, logout}
