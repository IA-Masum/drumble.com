
const setLocals = () => {
    return (req, res, next) => {
        res.locals.user = req.session.user
        res.locals.isLoggedIn = req.session.isLoggedIn
        next()
    }
}

module.exports = {setLocals}