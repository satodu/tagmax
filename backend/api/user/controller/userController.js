const _ = require('lodash');
const mongoose      = require('mongoose');
var ObjectId        = mongoose.Types.ObjectId;
const userSchema    = require('../model/userSchema');
const userModel     = require('../model/userModel')(userSchema, require('../../../config/ref/userRef'));
const companySchema = require('../../company/model/companySchema');
const companyModel  = require('../../company/model/companyModel')(companySchema, require('../../../config/ref/companyRef'));

module.exports = {
	list : function(req, res){
		userModel.aggregate({
			$lookup : {from : 'companies', localField : 'company_id', foreignField : '_id', as : 'company'},
		},function(error, result){
			if(error)
        		return res.status(500).json({errors:[error]});
			return res.json({result});
		});
	},
	show : function(req, res){
		var id = req.params.id;
		userModel.aggregate({
			$match : {'_id' : ObjectId(id)}
		},{
			$lookup : {from : 'companies', localField : 'company_id', foreignField : '_id', as : 'company'},
		},function(error, result){
			if(error)
        		return res.status(500).json({errors:[error]});
			return res.json({result});
		});
	},
	create : function(req, res){
		var company_id = req.body.company_id;
        companyModel.findOne({_id : company_id}, function(error, result){
			if(error){
        		return res.status(500).json({errors:[error]});
			}else{
				//verificar se existe usuario admin
				let filter = {permission : 'admin'};
				userModel.findOne(filter, function(error, userResult){
					if(error){
		        		return res.status(500).json({errors:[error]});
					}
					if(userResult){
						//user comum
						createUser(req, res, company_id,'user');
					}else{
						//user admin
						createUser(req, res, company_id,'admin');
					}
				});
			}
		});
    },
	update : function(req, res){
		var id = req.params.id;
		userModel.findOne({_id : id}, function(error, result){
			if(error){
				return res.status(500).json({errors:[error]});
			}else{
				result.name = req.body.name ? req.body.name : result.name;
			    result.email = req.body.email ? req.body.email : result.email;
			    result.phone = req.body.phone ? req.body.phone : result.phone;
			    result.password = req.body.password ? req.body.password : result.password;
			    result.company_id = req.body.company_id ? req.body.company_id : result.company_id;
			    result.save(function(error, results){
			    	if(error) 
			    		return res.status(500).json({errors:[error]});

			    	return res.json({results});
			    });
			}
		});
	},
	remove : function(req, res){
		var id = req.params.id;
		userModel.findByIdAndRemove(id, function(error, result){
			if(error) 
				return res.status(500).json({errors:[error]});

			return res.json({result});
		});
	}
};

function createUser(req, res, id_company, permission){
	console.log("id_company ", req.body.company_id);
	userModel.findOne({email : req.body.email}, function(error, userold){
		if(error){
    		return res.status(500).json({errors:[error]});
		}
		if(userold){
			var error = [{'message' : 'E-mail já cadastrado!'}];
			return res.status(500).json({errors : error});
		}else{
			var user = new userModel({
				name       : req.body.name,
			    email      : req.body.email,
			    phone      : req.body.phone,
			    password   : req.body.password,
			    company_id : id_company,
			    permission : permission
	        });
	        user.save(function(error, user){
	        	if(error)
	        		return res.status(500).json({errors:[error]});
				return res.json({user});
	        });
		}
		return true;
	});
}
