module.exports = (req, res, next) => {
	if (!req.isAuthenticated())
		return res.status(400).json({
			err: true,
			message: 'Please login to view this resource',
		});
	next();
};
