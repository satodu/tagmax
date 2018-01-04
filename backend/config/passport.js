//var passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const userSchema = require('../api/user/model/userSchema');
const userModel = require('../api/user/model/userModel')(userSchema, require('./ref/userRef'));


module.exports = function(passport){
	passport.serializeUser(function(user, done) {
		done(null, user);
	});

	passport.deserializeUser(function(id, done) {
		userModel.findById(id, function(err, user) {
			done(err, user);
		});
	});

	passport.use('local-login', new LocalStrategy({
		usernameField: 'email',
		passwordField: 'password',
		passReqToCallback : true // allows us to pass back the entire request to the callback
	},
	function(req, email, password, done) {
		if(email){
			email = email.toLowerCase();
		}
		console.log('entrou');
		process.nextTick(function(){
			userModel.findOne({ email :  email }, function (err, user) {
				if (err) {
					return done(err);
				}
				if (!user) {
					return done(null, false, req.flash('loginMessage', 'No user found.'));
				}
				if (!user.validPassword(password)) {
					return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));
				}
				return done(null, user);
			});
		});
	}));
};




