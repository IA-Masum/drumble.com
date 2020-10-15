const router = require('express').Router()


const {getSignUpPage, signUp, getLoginPage, login, logout} = require('../controllers/authController');


router.get('/signUp', getSignUpPage)
router.post('/signUp', signUp)
router.get('/login', getLoginPage)
router.post('/login', login)
router.get('/logout', logout)


module.exports = router;