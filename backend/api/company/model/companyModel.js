module.exports = function(Schema, ModelName){
	const restful = require('node-restful');
	const mongoose = restful.mongoose;
	return restful.model(ModelName, Schema);
}