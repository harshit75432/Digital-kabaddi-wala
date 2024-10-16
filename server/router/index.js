const express = require('express');
const router = express.Router();



router.use('/authentication', require('./authentication/authenticationRoutes'));


module.exports = router;