const authorize = (...allowedRoles) => {
    return (req, res, next) => {
        const user = req.user;

        if (!user || !allowedRoles.includes(user.user_type)) {
            return res.status(403).json({ message: 'Access denied' });
        }

        next();
    };
};

module.exports = authorize;
