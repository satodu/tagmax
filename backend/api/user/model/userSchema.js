const restful          = require('node-restful');
const mongoose         = restful.mongoose;
const bcrypt           = require('bcrypt');
const SALT_WORK_FACTOR = 10;


const name       = require('../../../config/schema/fieldsName');
const permission = name;
const email      = require('../../../config/schema/fieldsEmail');
const phone      = require('../../../config/schema/fieldsPhone');
const password   = require('../../../config/schema/fieldsPassword');
const created_at = require('../../../config/schema/fieldsCreatedAt');
const ref        = require('../../../config/ref/userRef');

const userSchema = new mongoose.Schema({
	name       : name,
    email      : email,
    phone      : phone,
    permission : permission,
    password   : password,
	company_id : {
    	type : mongoose.Schema.ObjectId,
    	ref
    },
    created_at : created_at
});

userSchema.pre('save', function(next){
	var user = this;
	//verifica se foi alterado o hash
	if(!user.isModified('password')) return next();
	//generate a salt
	bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt){
		if(err) return next(err);
		// hash the password using our new salt
		bcrypt.hash(user.password, salt, function(err, hash) {
			if(err) return next(err);
			//override the cleartext password with the hashed one
			user.password = hash;
			next();
		});
	});
});

userSchema.methods.generateHash = function(password){
	return bcrypt.hashSync(password, bcrypt.genSaltSync(SALT_WORK_FACTOR), null);
}

userSchema.methods.validPassword = function(password) {  
  return bcrypt.compareSync(password, this.password);
}

module.exports = userSchema;