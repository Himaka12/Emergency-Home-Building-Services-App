const { body } = require('express-validator');

const registerValidation = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('phone')
    .trim()
    .matches(/^\d{10}$/)
    .withMessage('Mobile number must be 10 digits'),
  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters'),
  body('role')
    .optional()
    .isIn(['customer', 'worker'])
    .withMessage('Role must be customer or worker')
];

const loginValidation = [
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').notEmpty().withMessage('Password is required')
];

const updateMeValidation = [
  body('name').optional().trim().notEmpty().withMessage('Name is required'),
  body('phone')
    .optional()
    .trim()
    .matches(/^\d{10}$/)
    .withMessage('Mobile number must be 10 digits')
];

module.exports = {
  registerValidation,
  loginValidation,
  updateMeValidation
};
