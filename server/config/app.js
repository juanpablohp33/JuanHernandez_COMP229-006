// installed 3rd party packages
let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let cors = require('cors');

// modules for authentication
let session = require('express-session');
let passport = require('passport');

let passportJWT = require('passport-jwt');
let JWTStrategy = passportJWT.Strategy;
let ExtractJWT = passportJWT.ExtractJwt;

let flash = require('connect-flash');

// database setup
let mongoose = require('mongoose');
let DB = require('./db');

// point mongoose to the DB URI
mongoose.connect(DB.URI, { useNewUrlParser: true, useUnifiedTopology: true });

let mongoDB = mongoose.connection;
mongoDB.on('error', console.error.bind(console, 'Connection Error:'));
mongoDB.once('open', () => {
    console.log('Connected to MongoDB...');
});


let jwtOptions = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: DB.Secret
}

const strategy = new JWTStrategy(jwtOptions, (jwt_payload, done) => {
    User.findOne({ _id: jwt_payload.id })
        .then(user => {
            return done(null, user);
        })
        .catch(err => {
            return done(err, null);
        });
});

passport.use(strategy);

let indexRouter = require('../routes/index');
let usersRouter = require('../routes/users');
let foodsRouter = require('../routes/food');
let ordersRouter = require('../routes/order');

let app = express();

// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs'); // express  -e

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../../public')));
app.use(express.static(path.join(__dirname, '../../node_modules')));

app.use(cors({ credentials: true, origin: 'http://localhost:4200' }));

//setup express session
/*app.use(session({
  secret: "SomeSecret",
  resave:false,
  cookie: {
    secure: false,
    httpOnly: false // by default it's boolean value true
  }
}));*/

// initialize flash
app.use(flash());

// initialize passport

// passport user configuration

// create a User Model Instance
let userModel = require('../models/user');
let User = userModel.User;

// routing
writeENV();
app.use(express.static(__dirname.replace(/\\/g, "/") + '/views/dist'))
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/food-list', foodsRouter);
app.use('/orders', ordersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error', { title: 'Error' });
});

function writeENV() {
    if (process.env.NODE_ENV) {
        let content = "(function (window) {" +
            "window.__env = window.__env || {};" +
            "window.__env.SERVER_URL = '" + process.env.SERVER_URL + "';" +
            "}(this));"
        fs.writeFile(path.join(__dirname.replace(/\\/g, "/"), '/views/dist/index.html'), content, (err) => {
            if (err) throw err;
            console.log('SERVER_URL :', process.env.SERVER_URL)
            console.log('Successfully saved env.js file.');
        });
    }
}

module.exports = app;