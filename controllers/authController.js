

const getSignUpPage = (req, res, next) => {

    res.render('pages/auth/signUp.ejs', {pageTitle: "Create New Account"});

}

const signUp = (req, res, next) => {

}

const getLoginPage = (req, res, next) => {

}


const login = (req, res, next) => {

}

const logout = (req, res, next) => {

}

module.exports = {getSignUpPage, signUp, getLoginPage, login, logout}
