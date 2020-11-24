const router = require('express').Router()

//Import Validators
const {signUpValidator, logInValidator} = require('../validators/authValidators')

// Import Controllers
const {getSignUpPage, signUp, getLoginPage, login, logout} = require('../controllers/authController')

const {isUnAuthenticated} = require("../middlewares/authMiddleware")


router.get('/signUp',isUnAuthenticated, getSignUpPage)
router.post('/signUp', isUnAuthenticated, signUpValidator, signUp)
router.get('/login', isUnAuthenticated, getLoginPage)
router.post('/login', isUnAuthenticated, logInValidator, login)
router.get('/logout', logout)


module.exports = router;