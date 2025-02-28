const express = require('express');
const router = express.Router();
const matchController = require('../controllers/matchController');

router.post('/', matchController.processResult);

module.exports = router;
