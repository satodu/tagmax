const restful = require('node-restful');
const mongoose = restful.mongoose;

const googleParametersSchema = new mongoose.Schema({
    utm_source : {type : String, required : false},
	utm_medium : {type : String, required : false},
	utm_campaign :{type : String, required : false},
	utm_term : {type : String, required : false},
	website_url : {type : String, required : false},
	utm_content : {type : String, required : false},
	result_google :{type : String, required : false},
	url_parameters: {type : String, required : false},
    campaing_id : {
    	type : mongoose.Schema.ObjectId,
    	ref : require('../../../config/ref/googleParametersRef')
    },
    created_at : {type: Date, default: Date.now}
});

module.exports = googleParametersSchema;