const _ = require('lodash');
const userSchema = require('../../user/model/userSchema');
const userModel = require('../../user/model/userModel')(userSchema, require('../../../config/ref/userRef'));
const passport = require('passport');
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;


// middleware
function restrict(req, res, next) {
	if (req.session.user) {
		next();
	} else {
		req.session.error = 'Access denied!';
		res.redirect('/login');
	}
}

module.exports = {
	login : function(req, res){
		var mail = req.body.email;
		var password = req.body.password;
		userModel.findOne({email: mail}, function(error, user){
			if(!user) {
				return res.status(500).json({errors:[error]});
			}
			else if(!user.validPassword(password)){
				return res.status(500).json({errors:{message : 'Falha, e-mail ou password está incorreto'}});
			}
			return res.json({user});
		});
	}
};