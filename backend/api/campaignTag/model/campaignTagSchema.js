const restful  = require('node-restful');
const mongoose = restful.mongoose;

const url_landing_page = require('../../../config/schema/field-name-no-validate.js');
const url_complete     = url_landing_page;
const created_at       = require('../../../config/schema/fieldsCreatedAt');
const refCampaign      = require('../../../config/ref/campaignsRef');
//tagsGoogle
const utm_source   = url_landing_page;
const utm_medium   = url_landing_page;
const utm_campaign = url_landing_page;
const utm_term     = url_landing_page;
const utm_content  = url_landing_page;
const ga_result    = url_landing_page;

//tags AT
const type_at                = url_landing_page;
const plataform              = url_landing_page;
const ad_group               = url_landing_page;
const ad_variant             = url_landing_page;
const search                 = url_landing_page;
const exact_purchase_keyword = url_landing_page;
const email_campaing         = url_landing_page;
const send_date              = url_landing_page;
const link                   = url_landing_page;
const recipient              = url_landing_page;
const exact_date_and_time    = url_landing_page;
const creative               = url_landing_page;
const variant                = url_landing_page;
const format                 = url_landing_page;
const support_site           = url_landing_page;
const general_position       = url_landing_page;
const position_detail        = url_landing_page;
const affiliate_type         = url_landing_page;
const affiliate              = url_landing_page;
const result_at              = url_landing_page;

const tagsGoogle = new mongoose.Schema({
	utm_source   : utm_source,
	utm_medium   : utm_medium,
	utm_campaign : utm_campaign,
	utm_term     : utm_term,
	utm_content  : utm_content,
	ga_result    : ga_result,
	created_at   : created_at
});

//type : Sponsor Links, E-mail Campaigns, advertising, Affiliation, RSS
const tagAt = new mongoose.Schema({
	type_at                : type_at,
	plataform              : plataform,
	ad_group               : ad_group,
	ad_variant             : ad_variant,
	search                 : search,
	exact_purchase_keyword : exact_purchase_keyword,
	email_campaing         : email_campaing,
	send_date              : send_date,
	link                   : link,
	recipient              : recipient,
	exact_date_and_time    : exact_date_and_time,
	creative               : creative,
	variant                : variant,
	format                 : format,
	support_site           : support_site,
	general_position       : general_position,
	position_detail        : position_detail,
	affiliate_type         : affiliate_type,
	affiliate              : affiliate,
	result_at              : result_at
});

const campaignTagSchema = new mongoose.Schema({
    url_landing_page : url_landing_page,
    source           : ['GOOGLE', 'ATM'],
    campaign_id      : {type : mongoose.Schema.ObjectId, refCampaign},
    url_complete     : url_complete,
    tagsGoogle       : [tagsGoogle],
    tagsAt           : [tagAt],
    created_at       : created_at
});

module.exports = campaignTagSchema;