webpackJsonp([6],{

/***/ 137:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
__webpack_require__(146);


/***/ }),

/***/ 146:
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function($) {$(function(){
	var oTable = $("#tbCampaigns");
	oTable.DataTable();
	hideAllAtInputs();

	$('#atSelect').on('changed.bs.select', function () {
        if($(this).selectpicker('val') == "Sponsor Links"){
			hideAllAtInputs();
			showSponsorLinksInputs();
		}else if($(this).selectpicker('val') == "Email Campaigns"){
			hideAllAtInputs();
			showEmailCampaignInputs();
		}else if($(this).selectpicker('val') == "Advertising"){
			hideAllAtInputs();
			showAdvertisingInputs();
		}else if($(this).selectpicker('val') == "Affiliation"){
			hideAllAtInputs();
			showAffiliationInputs();
		}
		$(this).selectpicker('refresh');
    });
});

function showAffiliationInputs(){
	$("#form_affiliate_type").show();
	$("#form_affiliate").show();
	$("#form_creative").show();
	$("#form_variant").show();
}

function showAdvertisingInputs(){
	$("#form_creative").show();
	$("#form_variant").show();
	$("#form_format").show();
	$("#form_support_site").show();
	$("#form_general_position").show();
	$("#form_position_detail").show();
}

function showEmailCampaignInputs(){
	$("#form_email_campaing").show();
	$("#form_link").show();
	$("#form_recipient").show();
	$("#form_exact_date_and_time").show();
}

function showSponsorLinksInputs(){
	$("#form_plataform").show();
	$("#form_ad_group").show();
	$("#form_ad_variant").show();
	$("#form_search").show();
	$("#form_exact_purchase_keyword").show();
}

function hideAllAtInputs(){
	$("#form_plataform").hide();
	$("#form_ad_group").hide();
	$("#form_ad_variant").hide();
	$("#form_search").hide();
	$("#form_exact_purchase_keyword").hide();
	$("#form_email_campaing").hide();
	$("#form_link").hide();
	$("#form_recipient").hide();
	$("#form_exact_date_and_time").hide();
	$("#form_creative").hide();
	$("#form_variant").hide();
	$("#form_format").hide();
	$("#form_support_site").hide();
	$("#form_general_position").hide();
	$("#form_position_detail").hide();
	$("#form_affiliate_type").hide();
	$("#form_affiliate").hide();
}
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),

/***/ 216:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(137);


/***/ })

},[216]);