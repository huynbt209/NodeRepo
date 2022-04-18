const express = require('express');
const { isLoggedIn, isSignedIn } = require('../middlewares/middlewares');
const adminController = require('../controllers/adminController')

const router = express.Router();

router.get('/user-list', isSignedIn, adminController.getUserList)
router.get('/create-user', adminController.getCreateUser)
router.post('/create-user', adminController.createUser)
router.get('/user-list/:user_id', adminController.userDetail)
router.patch('/users/:user_id', isLoggedIn, adminController.lockOrUnlockUser);
router.get('/edit-user', isSignedIn, adminController.getEditUser)
router.put('/user-list', isLoggedIn, adminController.EditUser)
router.get('/request',isSignedIn, adminController.getAllRequest)
router.put('/request',isSignedIn, adminController.reviewRequest)

module.exports = router;
