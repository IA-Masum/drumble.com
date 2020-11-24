const getDashboardPage = (req, res, next) => {
    res.render('pages/dashboard/dashboard', {pageTitle: "My Dashboard"})

}

module.exports = {getDashboardPage}