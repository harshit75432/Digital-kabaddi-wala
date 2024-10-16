const express = require('express');
const router = express.Router();
const authenticationController = require('../../controller/authentication')

router.post('/signup', authenticationController.createUser)
router.post('/login',authenticationController.login)

// Export the router
module.exports = router;
