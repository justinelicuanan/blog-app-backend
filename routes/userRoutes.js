const express = require('express');
const {
	registerPost,
	loginPost,
	logoutGet,
	usersGet,
	deleteDelete,
} = require('../controllers/userControllers');
const { verifyAuth } = require('../middlewares/authMiddlewares');

// Inits
const router = express.Router();

// Routes
router.post('/register', registerPost);
router.post('/login', loginPost);
router.get('/logout', verifyAuth, logoutGet);
router.get('/', usersGet);
router.delete('/delete/:username', deleteDelete);

module.exports = router;
