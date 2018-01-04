const _             = require('lodash');
const mongoose      = require('mongoose');
var ObjectId        = mongoose.Types.ObjectId;

const campaignsTagSchema = require('../model/campaignTagSchema');
const campaignsTagModel  = require('../model/campaignTagModel')(campaignsTagSchema, require('../../../config/ref/campaignsTagRef'));
const campaignsSchema = require('../../campaigns/model/campaignsSchema');
const campaignsModel  = require('../../campaigns/model/campaignsModel')(campaignsSchema, require('../../../config/ref/campaignsRef'));

module.exports = {
	list : function(req, res){
		campaignsTagModel.aggregate({
			$lookup : {from : 'campaigns', localField : 'campaign_id', foreignField : '_id', as : 'campaign'},
		}, function(error, result){
			if(error)
        		return res.status(500).json({errors:[error]});
			return res.json({result});
		});
	},
	show : function(req, res){
		var id = req.params.id;
		campaignsTagModel.aggregate({
			$match : {'_id' : ObjectId(id)}
		},{
			$lookup : {from : 'campaigns', localField : 'campaign_id', foreignField : '_id', as : 'campaign'},
		},function(error, result){
			if(error)
        		return res.status(500).json({errors:[error]});
			return res.json({result});
		});
	},
	create : function(req, res){
		var campaign_id = req.body.campaign_id;
        campaignsModel.findOne({_id : campaign_id}, function(error, result){
			if(error){
        		return res.status(500).json({errors:[error]});
			}else{
				var tag = new campaignsTagModel({
					url_landing_page : req.body.url_landing_page,
				    source           : req.body.source,
				    url_complete     : req.body.url_complete,
				    campaign_id      : campaign_id,
				    tagsGoogle       : req.body.tagsGoogle,
				    tagsAt           : req.body.tagsAt
		        });
				tag.save(function(error, user){
		        	if(error)
		        		return res.status(500).json({errors:[error]});
					return res.json({user});
		        });
			}
		});
    },
    update : function(req, res){
		var id = req.params.id;
		campaignsTagModel.findOne({_id : id}, function(error, result){
			if(error){
				return res.status(500).json({errors:[error]});
			}else{
				result.url_landing_page = req.body.url_landing_page ? req.body.url_landing_page : result.url_landing_page;
			    result.source           = req.body.source ? req.body.source : result.source;
			    result.campaign_id      = req.body.campaign_id ? req.body.campaign_id : result.campaign_id;
			    result.url_complete     = req.body.url_complete ? req.body.url_complete : result.url_complete;
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
		campaignsTagModel.findByIdAndRemove(id, function(error, result){
			if(error) 
				return res.status(500).json({errors:[error]});

			return res.json({result});
		});
	}
};