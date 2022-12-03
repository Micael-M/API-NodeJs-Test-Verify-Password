const express = require('express');
const controller = require('../controllers/verifyController');

const router = express.Router();

router.post('/verify', controller.verifyPassword);

module.exports = router;
