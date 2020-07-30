module.exports = {
    checkAuthentication: (req,res,next) => {
        if(req.isAuthenticated())
            return next()
        req.flash('warning', 'You need to be loggedIn')
        res.redirect('/login')
    },
    forwardAuthentication: (req,res,next) => {
        if(!req.isAuthenticated())
            return next()
        res.redirect('/dashboard')
    }
}