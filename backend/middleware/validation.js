import { body, param, validationResult } from 'express-validator';

export const validateCreateRecord = [
  body('name')
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Name is required and must be between 1-100 characters'),
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Valid email is required'),
  body('age')
    .optional()
    .isInt({ min: 0, max: 150 })
    .withMessage('Age must be a number between 0-150'),
  body('address')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Address must be less than 500 characters'),
  body('phone')
    .optional()
    .matches(/^[\+]?[1-9][\d]{0,15}$/)
    .withMessage('Phone must be a valid phone number'),
  handleValidationErrors
];

export const validateUpdateRecord = [
  param('id')
    .isInt({ min: 1 })
    .withMessage('Valid row ID is required'),
  body('name')
    .optional()
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Name must be between 1-100 characters'),
  body('email')
    .optional()
    .isEmail()
    .normalizeEmail()
    .withMessage('Valid email is required'),
  body('age')
    .optional()
    .isInt({ min: 0, max: 150 })
    .withMessage('Age must be a number between 0-150'),
  body('address')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Address must be less than 500 characters'),
  body('phone')
    .optional()
    .matches(/^[\+]?[1-9][\d]{0,15}$/)
    .withMessage('Phone must be a valid phone number'),
  handleValidationErrors
];

export const validateDeleteRecord = [
  param('id')
    .isInt({ min: 1 })
    .withMessage('Valid row ID is required'),
  handleValidationErrors
];

export const validateGetRecord = [
  param('id')
    .isInt({ min: 1 })
    .withMessage('Valid row ID is required'),
  handleValidationErrors
];

function handleValidationErrors(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed');
    error.name = 'ValidationError';
    error.details = errors.array();
    error.statusCode = 400;
    return next(error);
  }
  next();
}