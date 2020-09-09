import { check, validationResult } from 'express-validator';

export const userRegistrationValidator = [
    check('username')
        .trim()
        .not()
        .isEmpty()
        .withMessage('Username required!')
        .isLength({ min: 3 })
        .withMessage('Minimum 3 characters required!')
        .isLength({ max: 20 })
        .withMessage('Maximum 14 characters required!')
        .bail(),
    check('email')
        .trim()
        .normalizeEmail()
        .not()
        .isEmpty()
        .withMessage('Email required!')
        .isEmail()
        .withMessage('Invalid email address!')
        .bail(),
    check('password')
        .trim()
        .not()
        .isEmpty()
        .withMessage('Password required!')
        .isLength({ min: 6 })
        .withMessage('Password requires minimum 6 characters!')
        .isLength({ max: 20 })
        .withMessage('Password requires manimum 20 characters!')
        .matches()
        .withMessage('Maximum 20 characters required!')
        .bail(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(422).json({ succes: false, errors: errors.array() });
        next();
    }
];

export const userLoginValidator = [
    check('username')
        .trim()
        .not()
        .isEmpty()
        .withMessage('Username or email required!')
        .isLength({ min: 3 })
        .withMessage('Username or email requires minimum 3 characters!')
        .bail(),
    check('password')
        .trim()
        .not()
        .isEmpty()
        .withMessage('Password required!')
        .isLength({ min: 6 })
        .withMessage('Password requires minimum 6 characters!')
        .isLength({ max: 20 })
        .withMessage('Password requires manimum 20 characters!')
        .bail(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(422).json({ succes: false, errors: errors.array() });
        next();
    }
];

export const updatePasswordValidator = [
    check('oldPassword')
        .trim()
        .not()
        .isEmpty()
        .withMessage('Old password required!')
        .isLength({ min: 6 })
        .withMessage('Password requires minimum 6 characters!')
        .isLength({ max: 20 })
        .withMessage('Password requires manimum 20 characters!')
        .bail(),
    check('newPassword')
        .trim()
        .not()
        .isEmpty()
        .withMessage('New password required!')
        .isLength({ min: 6 })
        .withMessage('Password requires minimum 6 characters!')
        .isLength({ max: 20 })
        .withMessage('Password requires manimum 20 characters!')
        .bail(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(422).json({ succes: false, errors: errors.array() });
        next();
    }
];

export const adminValidator = [
    check('_id')
        .trim()
        .not()
        .isEmpty()
        .withMessage('Uid required!')
        .isLength({ min: 24, max: 24 })
        .withMessage('Uid should be 24 characters!')
        .bail(),
    check('username')
        .trim()
        .not()
        .isEmpty()
        .withMessage('Username required!')
        .isLength({ min: 3 })
        .withMessage('Username requires minimum 3 characters!')
        .bail(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(422).json({ succes: false, errors: errors.array() });
        next();
    }
];

export const addSectionValidator = [
    check('title')
        .trim()
        .escape()
        .not()
        .isEmpty()
        .withMessage('Title required!')
        .isLength({ min: 4 })
        .withMessage('Minimum 4 characters required!')
        .bail(),
    check('description')
        .trim()
        .escape()
        .not()
        .bail(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(422).json({ succes: false, errors: errors.array() });
        next();
    },
];

export const threadValidator = [
    check('title')
        .trim()
        .not()
        .isEmpty()
        .withMessage('Title required!')
        .isLength({ min: 2 })
        .withMessage('Minimum 2 characters required!')
        .bail(),
    check('content')
        .trim()
        .not()
        .isEmpty()
        .withMessage('Content required!')
        .isLength({ min: 15 })
        .withMessage('Minimum 15 characters required!')
        .bail(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(422).json({ succes: false, errors: errors.array() });
        next();
    },
];

export const replyValidator = [
    check('content')
        .trim()
        .not()
        .isEmpty()
        .withMessage('Content required!')
        .isLength({ min: 8 })
        .withMessage('Minimum 8 characters required!')
        .bail(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(422).json({ succes: false, errors: errors.array() });
        next();
    },
];

export const forumValidator = [
    check('name')
        .trim()
        .not()
        .isEmpty()
        .withMessage('Name required!')
        .isLength({ min: 2 })
        .withMessage('Minimum 2 characters required!')
        .bail(),
    check('description')
        .trim()
        .not()
        .isEmpty()
        .withMessage('Description required!')
        .isLength({ min: 2 })
        .withMessage('Minimum 2 characters required!')
        .bail(),
    check('shortDescription')
        .trim()
        .not()
        .isEmpty()
        .withMessage('Short description required!')
        .isLength({ min: 2 })
        .withMessage('Minimum 2 characters required!')
        .bail(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(422).json({ succes: false, errors: errors.array() });
        next();
    },
];
