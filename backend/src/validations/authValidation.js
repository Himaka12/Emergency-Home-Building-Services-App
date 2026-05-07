const { body } = require('express-validator');

const registerValidation = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('phone')
    .trim()
    .matches(/^\d{10}$/)
    .withMessage('Mobile number must be 10 digits'),
  body('password')
    .isStrongPassword({
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1
    })
    .withMessage('Password must be at least 8 characters and include uppercase, lowercase, number, and symbol'),
  body('role')
    .optional()
    .isIn(['customer', 'worker'])
    .withMessage('Role must be customer or worker')
];

const loginValidation = [
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').notEmpty().withMessage('Password is required')
];

module.exports = {
  registerValidation,
  loginValidation
};
