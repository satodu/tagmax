const _ = require('lodash');

const googleParametersSchema = require('../model/googleParametersSchema');
const googleParametersModel = require('../model/googleParametersModel')(googleParametersSchema, require('../../../config/ref/googleParametersRef'));
const campaignsSchema = require('../../campaigns/model/campaignsSchema');
const campaignsModel = require('../../campaigns/model/campaignsModel')(campaignsSchema, require('../../../config/ref/campaignsRef'));


module.exports = {
	list : function(req, res){
		googleParametersModel.find(function(error, result){
			if(error)
        		return res.status(500).json({errors:[error]});
			return res.json({result});
		});
	},
	show : function(req, res){
		var id = req.params.id;
		campaignsModel.findOne({_id : id}, function(error, result){
			if(error)
        		return res.status(500).json({errors:[error]});
			return res.json({result});
		});
	},
	create : function(req, res){
		var campaing_id = req.body.campaing_id;
        campaignsModel.findOne({_id : campaing_id}, function(error, result){
			if(error){
        		return res.status(500).json({errors:[error]});
			}else{
				var googleParameters = new googleParametersModel({
					utm_source : req.body.utm_source,
				    utm_medium : req.body.utm_medium,
				    utm_campaign : req.body.utm_campaign,
				    utm_term : req.body.utm_term,
				    website_url : req.body.website_url,
				    utm_content : req.body.utm_content,
				    result_google : req.body.result_google,
				    url_parameters : req.body.url_parameters,
				    campaing_id : campaing_id
		        });
				googleParameters.save(function(error, user){
		        	if(error)
		        		return res.status(500).json({errors:[error]});
					return res.json({user});
		        });
			}
		});
    },
	update : function(req, res){
		var id = req.params.id;
		googleParametersModel.findOne({_id : id}, function(error, result){
			if(error){
				return res.status(500).json({errors:[error]});
			}else{
				result.utm_source = req.body.utm_source ? req.body.utm_source : result.utm_source;
			    result.utm_medium = req.body.utm_medium ? req.body.utm_medium : result.utm_medium;
			    result.utm_campaign = req.body.utm_campaign ? req.body.utm_campaign : result.utm_campaign;
			    result.utm_term = req.body.utm_term ? req.body.utm_term : result.utm_term;
			    result.website_url = req.body.website_url ? req.body.website_url : result.website_url;
			    result.utm_content = req.body.utm_content ? req.body.utm_content : result.utm_content;
			    result.result_google = req.body.result_google ? req.body.result_google : result.result_google;
			    result.url_parameters = req.body.url_parameters ? req.body.url_parameters : result.url_parameters;
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
		googleParametersModel.findByIdAndRemove(id, function(error, result){
			if(error) 
				return res.status(500).json({errors:[error]});

			return res.json({result});
		});
	}
};