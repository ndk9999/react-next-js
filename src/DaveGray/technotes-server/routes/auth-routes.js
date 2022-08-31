const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth-controller');
const loginLimiter = require('../middlewares/login-limiter');

router.route('/')
    .post(loginLimiter, authController.login);

router.route('/refresh')
    .get(authController.refresh);

router.route('/logout')
    .post(authController.logout);

module.exports = router;