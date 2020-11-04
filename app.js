const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
// const MongoStore = require("connect-mongo")(session)

// Inits
require('dotenv').config();
require('./middlewares/passport');
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
app.use(
	session({
		secret: process.env.SESSION_SECRET.split(','),
		cookie: {
			maxAge: 3600000,
			httpOnly: true,
			// secure: true
		},
		resave: false,
		saveUninitialized: false,
		// store: new MongoStore({ mongooseConnection: mongoose.connection })
	})
);
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/users', require('./routes/users'));
