const express = require('express');
const session = require('express-session');
const util = require('util');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const MongoConnection = require('connect-mongo')(session);
const path = require('path');
const passport = require('passport');
const flash = require('connect-flash');
const ExpressValidator = require('express-validator');
const methodOverride = require('method-override');
const moment = require('moment');
const routes = require('./routes/index');
const helpers = require('./helpers/index');

// Loading passport configurations
require('./handlers/passport');

const app = express();

// setup views
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// setup static files
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(ExpressValidator());
app.use(cookieParser());
app.use(methodOverride((req, res)=>{
	if (req.body && typeof req.body === 'object' && '_method' in req.body) {
		// look in urlencoded POST bodies and delete it
		const method = req.body._method;
		delete req.body._method;
		return method;
	}
}));

app.use(session({
	secret: process.env.SECRET,
	key: process.env.KEY,
	resave: false,
	saveUninitialized: false,
	store: new MongoConnection({ mongooseConnection: mongoose.connection }),
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

app.use((req, res, next) => {
	req.login = util.promisify(req.login);
	next();
});

// passing some useable stuff to views as helpers
app.use((req, res, next) => {
	res.locals.helpers = helpers;
	res.locals.flashes = req.flash();
	res.locals.user = req.user || null;
	res.locals.moment = moment;
	next();
});

app.use('/', routes);


module.exports = app;
