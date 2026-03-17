module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.redirectUrl = req.originalUrl;

        req.session.save((err) => { // ✅ FORCE SAVE SESSION
            if (err) {
                return next(err);
            }
            req.flash("error", "You must be signed in to create a listing!");
            res.redirect("/login");
        });

    } else {
        next();
    }
};


module.exports.saveRedirectUrl = (req, res, next) => {
    if (req.session.redirectUrl) {
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
};