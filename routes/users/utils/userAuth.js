module.exports = {
    userAuthorization: (req, res, next) => {
        if (!req.isAuthenticated()) return res.redirect('/');
        return next();
    }
};