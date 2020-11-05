const express = require('express');
const {
	createPost,
	postGet,
	postsGet,
	updatePatch,
	deleteDelete,
} = require('../controllers/posts');

// Inits
const router = express.Router();

// Routes
router.post('/create', require('../middlewares/ensureAuth'), createPost);
router.get('/:slug', postGet);
router.get('/', postsGet);
router.patch(
	'/update/:slug',
	require('../middlewares/ensureAuthor'),
	updatePatch
);
router.delete(
	'/delete/:slug',
	require('../middlewares/ensureAuthor'),
	deleteDelete
);

module.exports = router;
