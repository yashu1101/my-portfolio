export const isAuthenticated = (req, res, next) => {
    try {
        if (req.session && req.session.isAuthenticated) {
            return next();
        }
        else {
            return res.redirect('/api/auth/login')
        }

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};