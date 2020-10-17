const router = require('express').Router()

//Import Validators
const {signUpValidator} = require('../validators/authValidators')

// Import Controllers
const {getSignUpPage, signUp, getLoginPage, login, logout} = require('../controllers/authController')


router.get('/signUp', getSignUpPage)
router.post('/signUp',signUpValidator, signUp)
router.get('/login', getLoginPage)
router.post('/login', login)
router.get('/logout', logout)


module.exports = router;