const { check, validationResult } = require('express-validator')

exports.registerValidator = [
    check('username').not().isEmpty().trim().withMessage('All fields required'),
    check('email').isEmail().normalizeEmail().withMessage('Invalid email'),
    check('password')
        .isLength({ min: 6 }).withMessage('The password must have at least 6 characters'),
];


exports.loginValidator = [
    check('email').isEmail().normalizeEmail().withMessage('Invalid email'),
    check('password')
        .isLength({ min: 6 }).withMessage('The password must have at least 6 characters'),
];

exports.validatorResult = (req, res, next) => {
    const result = validationResult(req);
    const hasErrors = !result.isEmpty();

    if (hasErrors) {
        const firstError = result.array()[0].msg;
        return res.status(400).json({
            errorMessage: firstError,
        });

        // console.log('hasErrors: ', hasErrors);
        // console.log('result: ', result);
    }

    next();
};