
const router = require('express').Router()

const {isAuthenticated} = require("../middlewares/authMiddleware")
const {getDashboardPage} = require('../controllers/dashboardController')


router.get("/", isAuthenticated , getDashboardPage )

module.exports = router