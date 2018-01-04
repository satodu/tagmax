const restful = require('node-restful');
const mongoose = restful.mongoose;	

const name        = require('../../../config/schema/fieldsName');
const cnpj        = require('../../../config/schema/fieldsCnpj');
const responsible = name;
const email       = require('../../../config/schema/fieldsEmail');
const phone_comm  = require('../../../config/schema/fieldsPhone');
const password    = require('../../../config/schema/fieldsPassword');
const created_at  = require('../../../config/schema/fieldsCreatedAt');
const refUser     = require('../../../config/ref/userRef');
const refCampaign = require('../../../config/ref/campaignsRef');

const companySchema = new mongoose.Schema({
    name 		: name,
    cnpj 		: cnpj,
    responsible : responsible,
    phone_comm  : phone_comm,
    email       : email,
    users       : [{ type: mongoose.Schema.Types.ObjectId, refUser }],
    campaigns   : [{ type: mongoose.Schema.Types.ObjectId, refCampaign }],
    created_at  : created_at
});

module.exports = companySchema;