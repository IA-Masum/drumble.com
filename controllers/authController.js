const bcrypt = require('bcrypt')


const User = require('../models/User')

const getSignUpPage = (req, res, next) => {

    res.render('pages/auth/signUp.ejs', {pageTitle: "Create New Account"})

}

const signUp = async (req, res, next) => {

    let {userName, email, password, confirmPassword} = req.body


    try {

        let hashedPassword = await bcrypt.hash(password, 11)

        let user = new User({userName, email, password: hashedPassword})

        let createdUser = await user.save()
        console.log('User Created Successful!', createdUser)
        res.render('pages/auth/signUp.ejs', {pageTitle: "Create New Account"})

    } catch (e) {

        console.log(e)
        next(e)
    }
}

const getLoginPage = (req, res, next) => {

    res.render('pages/auth/login.ejs', {pageTitle: 'Log In'});

}


const login = async (req, res, next) => {

    let{email, password} = req.body

    try {

       let user = await User.findOne({email})
       if(!user){
          return res.json({
               message: 'Invalid Information'
           })
       }

       let match = await bcrypt.compare(password, user.password)
       if(!match){
           return res.json({
               message: 'Invalid Information'
           })
       }

       console.log(user)

       res.render('pages/auth/login.ejs', {pageTitle: 'Log In'});

    }catch (e) {
        console.log(e)
        next(e)
    }

}

const logout = (req, res, next) => {

}

module.exports = {getSignUpPage, signUp, getLoginPage, login, logout}
