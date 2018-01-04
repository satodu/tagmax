webpackJsonp([1],{

/***/ 13:
/***/ (function(module, exports) {

module.exports = {"Sponsor Links":[{"field":"Plataform","help":"213123123123","content":""},{"field":"Ad Group","help":"213123123123","content":""},{"field":"AD Variant","help":"213123123123","content":""},{"field":"Search","help":"213123123123","content":""},{"field":"Exact Purchase Keyword","help":"213123123123","content":""}],"Email Campaigns":[{"field":"Email campaign","help":"213123123123","content":""},{"field":"Send Date","help":"213123123123","content":""},{"field":"Link","help":"213123123123","content":""},{"field":"Recipient","help":"213123123123","content":""},{"field":"Exact date and time","help":"213123123123","content":""}],"Advertising":[{"field":"Creative","help":"213123123123","content":""},{"field":"Variant","help":"213123123123","content":""},{"field":"Format","help":"213123123123","content":""},{"field":"Support Site","help":"213123123123","content":""},{"field":"General position","help":"213123123123","content":""},{"field":"Position detail","help":"213123123123","content":""}],"Affiliation":[{"field":"Affiliate type","help":"213123123123","content":""},{"field":"Affiliate","help":"213123123123","content":""},{"field":"Format","help":"213123123123","content":""},{"field":"Creative","help":"213123123123","content":""},{"field":"Variant","help":"213123123123","content":""}],"RSS":{}}

/***/ }),

/***/ 134:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function($, jQuery) {
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference path="../../../typings.d.ts"/>
var formData = __webpack_require__(13);
var atCreate = (function () {
    function atCreate() {
    }
    atCreate.prototype.destroyForm = function () {
        $('#contentAtForm').children().hide();
    };
    atCreate.prototype.buildform = function (formOption) {
        var formElements = formData[formOption];
        atCreate.prototype.destroyForm();
        for (var _i = 0, formElements_1 = formElements; _i < formElements_1.length; _i++) {
            var formElement = formElements_1[_i];
            jQuery('#contentAtForm').append('<div class="form-group animated fadeIn"><label>' + formElement.field + '</label><input class="form-control" name="' + formElement.field + '" /></div>');
        }
    };
    atCreate.prototype.atform = function () {
        jQuery(function () {
            jQuery('.selectpicker').on('loaded.bs.select', function () {
                return atCreate.prototype.buildform("Sponsor Links");
            });
            jQuery('.selectpicker').on('changed.bs.select', function () {
                var option = $(this).val();
                return atCreate.prototype.buildform(option);
            });
        });
    };
    return atCreate;
}());
var atForminit = new atCreate;
//atForminit.atform();

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3), __webpack_require__(3)))

/***/ }),

/***/ 135:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function($) {
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference path="../../../typings.d.ts"/>
var ATobject = __webpack_require__(13);
var GAobject = __webpack_require__(193);
var concatURL = (function () {
    function concatURL() {
        concatURL.prototype.setFieldsGA();
        concatURL.prototype.setFieldsAT();
        concatURL.prototype.propGa = GAobject;
    }
    concatURL.prototype.getGaObject = function () {
        return concatURL.prototype.propGa;
    };
    concatURL.prototype.setFieldsAT = function () {
        var at = ATobject;
        $(function () {
            $('#at').find('input').change(function () {
                console.log('working change!');
                // (<HTMLInputElement>document.getElementById('ATresult')).value = '';
                //  let fieldName = $(this).attr('name');
                //  let content = concatURL.prototype.checkSpaces($(this).val());
                //  at[fieldName].content = content;
                //  let html = '';
                //  for(let key in at){
                //    if(at[key].content != ''){
                //      html += key+'='+at[key].content+'&';
                //    }
                //  }
                //  html = html.substring(0, (<string>html).length-1);
                //  (<HTMLInputElement>document.getElementById('ATresult')).value = html;
            });
        });
    };
    concatURL.prototype.setFieldsGA = function () {
        //let gaobj = GAobject;
        $(function () {
            $('#ga').find('input').change(function () {
                $(this).attr('data-ng-model', 'Form.CampaignTagAdd.' + $(this).attr('name'));
                document.getElementById('GAresult').value = '';
                var fieldName = $(this).attr('name');
                var content = concatURL.prototype.checkSpaces($(this).val());
                concatURL.prototype.getGaObject()[fieldName].content = content;
                var html = '';
                for (var key in concatURL.prototype.getGaObject()) {
                    if (concatURL.prototype.getGaObject()[key].content != '') {
                        html += key + '=' + concatURL.prototype.getGaObject()[key].content + '&';
                    }
                }
                html = html.substring(0, html.length - 1);
                document.getElementById('GAresult').value = html;
            });
        });
    };
    concatURL.prototype.checkSpaces = function (checkValue) {
        checkValue = checkValue.replace(/ /g, '%20');
        return checkValue;
    };
    return concatURL;
}());
exports.concatURL = concatURL;
//let concatUR = new concatURL();

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),

/***/ 136:
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(jQuery) {function checkbox() {
    jQuery(function () {
        var ga = jQuery("[name='ga']").bootstrapSwitch();
        var at = jQuery("[name='AT internet']").bootstrapSwitch();
        ga.bootstrapSwitch();
        at.bootstrapSwitch();
        ga.on("switchChange.bootstrapSwitch", function (event, state) {
            if (state) {
                jQuery('#ga').show();
                jQuery("#ga").animateCss("zoomIn");
            }
            else {
                jQuery("#ga").animateCss("zoomOut", true);
            }
        });
        at.on("switchChange.bootstrapSwitch", function (event, state) {
            if (state) {
                jQuery('#at').show();
                jQuery("#at").animateCss("zoomIn");
            }
            else {
                jQuery("#at").animateCss("zoomOut", true);
            }
        });
    });
}
checkbox();

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),

/***/ 142:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(189);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(6)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/css-loader/index.js!../../node_modules/less-loader/dist/cjs.js!./campaign.less", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js!../../node_modules/less-loader/dist/cjs.js!./campaign.less");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 189:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(5)(undefined);
// imports


// module
exports.push([module.i, ".grid-item {\n  width: 40%;\n  float: left;\n}\n", ""]);

// exports


/***/ }),

/***/ 193:
/***/ (function(module, exports) {

module.exports = {"utm_source":{"field":"utm_source","help":"213123123123","content":""},"utm_medium":{"field":"utm_medium","help":"2131asdfasd23123123","content":""},"utm_campaign":{"field":"utm_campaign","help":"213123sdfrqwe123123","content":""},"utm_term":{"field":"utm_term","help":"213123sasdfasd123123","content":""},"utm_content":{"field":"utm_content","help":"213123123123","content":""}}

/***/ }),

/***/ 215:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(136);
__webpack_require__(142);
__webpack_require__(134);
module.exports = __webpack_require__(135);


/***/ })

},[215]);