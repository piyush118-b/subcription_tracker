const { body, param } = require('express-validator');

const createSubscriptionRules = [
  body('service_name')
    .trim()
    .isString()
    .isLength({ min: 2, max: 100 })
    .withMessage('Service name must be between 2 and 100 characters'),
  body('cost')
    .isFloat({ gt: 0 })
    .withMessage('Cost must be a positive number'),
  body('billing_cycle')
    .isIn(['monthly', 'yearly'])
    .withMessage('Billing cycle must be either monthly or yearly'),
  body('next_renewal_date')
    .isISO8601()
    .withMessage('Next renewal date must be a valid ISO date'),
];

const updateStatusRules = [
  param('id')
    .isUUID()
    .withMessage('Invalid subscription ID'),
  body('status')
    .isIn(['active', 'paused'])
    .withMessage('Status must be either active or paused'),
];

const deleteRules = [
  param('id')
    .isUUID()
    .withMessage('Invalid subscription ID'),
];

module.exports = {
  createSubscriptionRules,
  updateStatusRules,
  deleteRules,
};
