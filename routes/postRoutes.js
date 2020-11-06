const express = require('express');
const {
	createPost,
	postGet,
	authorGet,
	postsGet,
	updatePatch,
	deleteDelete,
} = require('../controllers/postControllers');
const { verifyAuth, verifyAuthor } = require('../middlewares/authMiddlewares');

// Inits
const router = express.Router();

// Routes
router.post('/create', verifyAuth, createPost);
router.get('/:slug', postGet);
router.get('/author/:username', authorGet);
router.get('/', postsGet);
router.patch('/update/:slug', verifyAuth, verifyAuthor, updatePatch);
router.delete('/delete/:slug', verifyAuth, verifyAuthor, deleteDelete);

module.exports = router;
