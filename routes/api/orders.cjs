const express = require('express');
const router = express.Router();
const ordersCtrl = require('../../controllers/api/orders.cjs');

// GET /api/orders/history
router.get('/history', ordersCtrl.history);

module.exports = router;