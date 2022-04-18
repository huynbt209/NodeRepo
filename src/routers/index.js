const express = require('express');
const indexController = require('../controllers/index');
const { checkLogin } = require('../middlewares/middlewares');

const router = express.Router();

router.get('/login', checkLogin, (req, res) => indexController.loginForm(req, res));
router.post('/login', (req, res) => indexController.login(req, res));
router.get('/logout', (req, res) => indexController.logout(req, res));

module.exports = router;