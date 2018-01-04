const _             = require('lodash');
const mongoose      = require('mongoose');
var ObjectId        = mongoose.Types.ObjectId;
const companySchema = require('../model/companySchema');
const companyModel  = require('../model/companyModel')(companySchema, require('../../../config/ref/companyRef'));

module.exports = {
	list : function(req, res){
		companyModel.aggregate({
			$lookup : {from : 'users', localField : '_id', foreignField : 'company_id', as : 'users'},
		}, function(error, result){
			if(error)
        		return res.status(500).json({errors:[error]});
			return res.json({result});
		});
	},
	show : function(req, res){
		var id = req.params.id;
		var query = {_id : id};
		companyModel.aggregate({
			$match : {'_id' : ObjectId(id)}
		},{
			$lookup : {from : 'users', localField : '_id', foreignField : 'company_id', as : 'users'},
		},{
			$lookup : {from : 'campaigns', localField : '_id', foreignField : 'company_id', as : 'campaigns'},
		}).exec(function(error, result){
			if(error)
        		return res.status(500).json({errors:[error]});
			return res.json({result});
		});
	},
	create : function(req, res){
		var company = new companyModel({
			name : req.body.name,
		    cnpj : req.body.cnpj,
		    responsible : req.body.responsible,
		    phone_comm : req.body.phone_comm,
		    email : req.body.email
        });

        company.save(function(error, company){
        	if(error)
        		return res.status(500).json({errors:[error]});
			return res.json({company});
        });
	},
	update : function(req, res){
		var id = req.params.id;
		companyModel.findOne({_id : id}, function(error, result){
			if(error){
				return res.status(500).json({errors:[error]});
			}else{
				result.name = req.body.name ? req.body.name : result.name;
			    result.cnpj = req.body.cnpj ? req.body.cnpj : result.cnpj;
			    result.responsible = req.body.responsible ? req.body.responsible : result.responsible;
			    result.phone_comm = req.body.phone_comm ? req.body.phone_comm : result.phone_comm;
			    result.email = req.body.email ? req.body.email : result.email;

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
		companyModel.findByIdAndRemove(id, function(error, result){
			if(error) 
				return res.status(500).json({errors:[error]});

			return res.json({result});
		});
	}
};