const express = require('express');
const {
	registerPost,
	loginPost,
	logoutGet,
	userGet,
	usersGet,
	updatePatch,
	deleteDelete,
} = require('../controllers/userControllers');
const {
	verifyAuth,
	verifyUnauth,
	verifyUser,
} = require('../middlewares/authMiddlewares');

// Inits
const router = express.Router();

// Routes
router.post('/register', verifyUnauth, registerPost);
router.post('/login', verifyUnauth, loginPost);
router.get('/logout', verifyAuth, logoutGet);
router.get('/:username', userGet);
router.get('/', usersGet);
router.patch('/update/:username', verifyAuth, verifyUser, updatePatch);
router.delete('/delete/:username', verifyAuth, verifyUser, deleteDelete);

module.exports = router;
