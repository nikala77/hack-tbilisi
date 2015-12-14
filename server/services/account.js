exports.isAuthenticated = function(req, res, next) {

	if (req.isAuthenticated()) {
		return next();
	}

	res.redirect('/login');
};

// if use is logged in he shouldn't move on login, signup, forgot and reset pages.
exports.blockAuth = function(req, res, next) {
	if(!req.isAuthenticated()) {
        return next();
    } else {
        return res.redirect('/dashboard');
    }
};