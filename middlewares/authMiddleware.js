const User = require('../models/User')


const bindUserWithRequest = () => {


    return async (req, res, next) => {
        if (!req.session.inLoggedIn) {
            return next()
        }

        try {

            let user = await User.findById(req.session.user._id)
            req.user = user
            next()
        } catch (e) {
            console.log(e)
            next(e)
        }
    }
}

const isAuthenticated = (req, res, next) =>{

    if(!req.session.isLoggedIn){
        res.redirect("auth/logIn")
    }
    next()



}

const isUnAuthenticated = (req, res, next) => {
    if (req.session.isLoggedIn){
        res.redirect("/dashboard")
    }

    next()

}

module.exports = {bindUserWithRequest, isAuthenticated, isUnAuthenticated}