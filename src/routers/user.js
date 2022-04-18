const express = require('express');
const { isLoggedIn, isSignedIn } = require('../middlewares/middlewares');
const userController = require('../controllers/userController')

const router = express.Router();

router.get('/create-request',isSignedIn, userController.getUserCreateRequest);
router.post('/create-request',isLoggedIn, userController.userCreateRequest);
router.get('/view-history', isSignedIn, userController.getViewHistory);
router.post('/view-history', isLoggedIn, userController.ViewHistoryByYear);
router.get('/details', isSignedIn, userController.getUserDetail);

module.exports = router;