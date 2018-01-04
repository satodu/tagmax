const restful  = require('node-restful');
const mongoose = restful.mongoose;

const name           = require('../../../config/schema/fieldsName');
const created_at     = require('../../../config/schema/fieldsCreatedAt');
const refCompany     = require('../../../config/ref/companyRef');
const refCampaignTag = require('../../../config/ref/campaignsTagRef');

const campaignsSchema = new mongoose.Schema({
    name          : name,
    company_id    : { type : mongoose.Schema.ObjectId, refCompany},
    campaigns_tag : {type : mongoose.Schema.ObjectId, refCampaignTag},
    created_at    : created_at
});

module.exports = campaignsSchema;