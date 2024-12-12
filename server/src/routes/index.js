const express = require('express');
const router = express.Router();

router.use('/analytics', require('./analytics'));

module.exports = router;