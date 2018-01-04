const _             = require('lodash');
const mongoose      = require('mongoose');
var ObjectId        = mongoose.Types.ObjectId;

const campaignsSchema = require('../model/campaignsSchema');
const campaignsModel  = require('../model/campaignsModel')(campaignsSchema, require('../../../config/ref/campaignsRef'));
const companySchema   = require('../../company/model/companySchema');
const companyModel    = require('../../company/model/companyModel')(companySchema, require('../../../config/ref/companyRef'));


module.exports = {
	list : function(req, res){
		campaignsModel.aggregate({
			$lookup : {from : 'companies', localField : 'company_id', foreignField : '_id', as : 'company'},
		}, {
			$lookup : {from : 'campaignstags', localField : '_id', foreignField : 'campaign_id', as : 'tags'},
		}, function(error, result){
			if(error)
        		return res.status(500).json({errors:[error]});
			return res.json({result});
		});
	},
	show : function(req, res){
		var id = req.params.id;
		campaignsModel.aggregate({
			$match : {'_id' : ObjectId(id)}
		},{
			$lookup : {from : 'companies', localField : 'company_id', foreignField : '_id', as : 'company'},
		},{
			$lookup : {from : 'campaignstags', localField : '_id', foreignField : 'campaign_id', as : 'tags'},
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
				var campaign = new campaignsModel({
					name : req.body.name,
				    source : req.body.source,
				    company_id : company_id
		        });
				campaign.save(function(error, user){
		        	if(error)
		        		return res.status(500).json({errors:[error]});
					return res.json({user});
		        });
			}
		});
    },
	update : function(req, res){
		var id = req.params.id;
		campaignsModel.findOne({_id : id}, function(error, result){
			if(error){
				return res.status(500).json({errors:[error]});
			}else{
				result.name = req.body.name ? req.body.name : result.name;
			    result.source = req.body.source ? req.body.source : result.source;
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
		campaignsModel.findByIdAndRemove(id, function(error, result){
			if(error) 
				return res.status(500).json({errors:[error]});

			return res.json({result});
		});
	}
};