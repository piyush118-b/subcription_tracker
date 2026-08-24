const express = require('express');
const router = express.Router();
const subscriptionsController = require('../controllers/subscriptions.controller');
const validateRequest = require('../middleware/validateRequest');
const {
  createSubscriptionRules,
  updateStatusRules,
  deleteRules,
} = require('../validators/subscription.validator');

router.post('/', createSubscriptionRules, validateRequest, subscriptionsController.create);
router.get('/', subscriptionsController.list);
router.patch('/:id', updateStatusRules, validateRequest, subscriptionsController.updateStatus);
router.delete('/:id', deleteRules, validateRequest, subscriptionsController.remove);

module.exports = router;
