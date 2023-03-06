import express from 'express';
import UsersController from '../controllers/users.js';

const router = express.Router();
const userController = new UsersController();

/*
 * Requires username and password body parameters.
 */
router.post('/login', userController.login);

/* Requires the following body parameters: 
 * first_name - string
 * last_name - string
 * email - string
 * username - string
 * password - string
 */
router.post('/signup', userController.signup);

/* Requires username query parameter. 
 * Returns isAvailable property indicating if 
 * the username is available.
 */
router.get('/checkUsernameAvailable', userController.checkUsernameAvailable);

router.get('/getCurrentUser', userController.getCurrentUser);

router.get('/accountsettings', userController.getAccountSettings);

router.put('/forgotinfo', userController.forgotPassword);

router.put('/changeEmail', userController.changeEmail);

router.put('/changeUser', userController.changeUser);

router.put('/changePassword', userController.changePassword);

// Admin functions

/* 
 * Requires a searchInput body parameter
 */
router.post('/search', userController.search);

export default router;