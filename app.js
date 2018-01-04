'user strict'

const express      = require('express');
const app          = express();
const passport     = require('passport');
const flash        = require('connect-flash');
const morgan       = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser   = require('body-parser');
const session      = require('express-session');
const path = require('path');

//require('./backend/config/database');

app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
//load files
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'node_modules')));
//session
// app.use(session({
//   cookieName : "tagmaxBoy",
//   secret: 'interactionboys26042017filialjoinvilleClm',
//   resave: false,
//   saveUninitialized: true,
//   httpOnly : true, //navegador nao pode acessar os meus cookies
//   cookie: {
//     //secure: false,
//     expires : new Date( Date.now() + 60 * 60 * 1000 ); // 1 hour,
//     duration : 7 * 60 * 60 * 100,
//     activeDuration : 20 * 60 * 1000,
//     ephemeral : false
//   }
// }));

app.use(session({
    cookieName: 'interactionTagmax',
    secret: 'interactionboys26042017filialjoinvilleClm',
    duration: 30 * 60 * 1000,
    activeDuration: 5 * 60 * 1000,
    httpOnly: true,
    secure: true,
    ephemeral: true
}))

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
require('./backend/config/passport')(passport);
//routers
require('./routes/routes')(app, passport);
//require('./routes/api')(app, passport);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;