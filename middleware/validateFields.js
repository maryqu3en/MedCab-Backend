const { check, validationResult, body } = require('express-validator');

exports.registerRules = [
    check("name").notEmpty().withMessage("Name is required"),
    check("email").isEmail().withMessage("Must be a valid email address"),
    check("password")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters long"),
    check("usertype")
        .notEmpty()
        .withMessage("Usertype is required")
        .isIn(["doctor", "staff", "admin"])
        .withMessage("Usertype must be either doctor, staff or admin"),

    body("specialty").if(body("usertype").equals("doctor"))
        .notEmpty().withMessage("Specialty is required for doctors"),
        
    body("phone").if(body("usertype").equals("doctor"))
        .isInt({ min: 0 }).withMessage("Phone is required for doctors"),
    
    body("role").if(body("usertype").equals("staff"))
        .notEmpty().withMessage("Role is required for staff").isIn(["nurse", "receptionist"]),
    
    body("phone").if(body("usertype").equals("staff"))
        .isInt({ min: 0 }).withMessage("Phone is required for staff"),
];

exports.loginRules = [
    check('email').isEmail().withMessage('Must be a valid email address'),
    check('password').not().isEmpty().withMessage('Password is required'),
];

exports.updateUserRules = [
    check('name').optional().not().isEmpty().withMessage('Name is required'),
    check('email').optional().isEmail().withMessage('Must be a valid email address'),
    check('password').optional().isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    check('usertype').optional().not().isEmpty().withMessage('Usertype is required'),
];

exports.deleteUserRules = [
    check('id').not().isEmpty().withMessage('ID is required'),
];

exports.getUserByIdRules = [
    check('id').not().isEmpty().withMessage('ID is required'),
];

exports.getUsersRules = [
    check('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
    check('limit').optional().isInt({ min: 1 }).withMessage('Limit must be a positive integer'),
];

exports.getProfileRules = [
    check('id').not().isEmpty().withMessage('ID is required'),
];

exports.validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};