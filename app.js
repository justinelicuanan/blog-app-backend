const express = require('express');
const mongoose = require('mongoose');

// Inits
require('dotenv').config();
const app = express();

// Connect to database
const { DB_URI, PORT } = process.env;
mongoose
	.connect(DB_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
		useCreateIndex: true,
	})
	.then(() => {
		console.log('Connected to database successfully');

		// Start the server
		app.listen(PORT, (err) => {
			if (err) throw err;
			console.log(`Server is listening on port ${PORT}`);
		});
	})
	.catch((err) => console.log(err));

// Middlewares
app.use(express.json());

// Routes
app.use('/users', require('./routes/users'));
