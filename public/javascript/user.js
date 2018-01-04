webpackJsonp([2],{

/***/ 12:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(5)(undefined);
// imports
exports.push([module.i, "@import url(https://fonts.googleapis.com/css?family=Open+Sans:300);", ""]);

// module
exports.push([module.i, "body {\n  font-family: 'Open Sans', sans-serif;\n  background: #e5e6e6;\n}\nh1,\nh2,\nh3,\nh4 {\n  color: grey;\n}\n* {\n  border-radius: 0 !important;\n  font-family: 'Open Sans', sans-serif !important;\n}\n.navbar {\n  z-index: 9999;\n}\n#img-header {\n  width: 70px;\n}\n.navbar-header {\n  height: 70px;\n}\n.nav.navbar-nav {\n  padding-top: 10px;\n  font-size: 18px;\n}\n.card-1 {\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);\n  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);\n}\n.card-1:hover {\n  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);\n}\n.card-2 {\n  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);\n  padding: 20px;\n}\n.card-3 {\n  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);\n}\n.card-4 {\n  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);\n}\n.card-5 {\n  box-shadow: 0 19px 38px rgba(0, 0, 0, 0.3), 0 15px 12px rgba(0, 0, 0, 0.22);\n}\n.container-fluid {\n  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.33);\n}\n.box-border-blue,\n.box-border-orange,\n.box-border-red,\n.box-border-green {\n  border-width: 1px 1px 1px 6px;\n  -webkit-box-shadow: 0px 5px 2px 0px rgba(0, 0, 0, 0.75);\n  -moz-box-shadow: 0px 5px 2px 0px rgba(0, 0, 0, 0.75);\n  box-shadow: 0px 5px 2px 0px rgba(0, 0, 0, 0.75);\n}\n.box-border-blue {\n  border-left: 6px solid #31708f;\n}\n.box-border-orange {\n  border-left: 6px solid #ff9800;\n}\n.box-border-red {\n  border-left: 6px solid #f44336;\n}\n.box-border-green {\n  border-left: 6px solid #4caf50;\n}\n.box9 {\n  background-color: #fff;\n}\n.card {\n  position: relative;\n  margin-bottom: 24px;\n  background-color: #ffffff !important;\n  color: #313534;\n  border-radius: 2px;\n  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.33);\n}\n.no-padding {\n  padding: 0 !important;\n}\n.card-body {\n  padding: 24px;\n  position: relative;\n}\n.text-success {\n  color: #4caf50;\n}\n.text-lg {\n  font-size: 125%;\n}\n.pull-right {\n  float: right !important;\n}\n.text-xl {\n  font-size: 180%;\n}\n.custom-content {\n  min-height: 100px;\n}\n.custom-class {\n  padding-top: 15px;\n}\n.background-white {\n  background-color: #FFFFFF;\n}\n.text-footer {\n  float: right;\n}\n.text-footer .imgFooter {\n  height: 60px;\n  width: auto;\n}\n.i {\n  width: 16px;\n  font-size: 14px;\n  display: inline-block;\n  text-align: right;\n  margin-right: 10px;\n  text-rendering: auto;\n  -webkit-font-smoothing: antialiased;\n}\n.i-dash {\n  background-image: url(/images/if_statistic_465076.png);\n  background-repeat: no-repeat;\n}\n.i-ads {\n  background-image: url(/images/if_information_465064.png);\n  background-repeat: no-repeat;\n}\n.i-users {\n  background-image: url(/images/if_88_171447.png);\n  background-repeat: no-repeat;\n}\n.i-company {\n  background-image: url(/images/if_business_465049.png);\n  background-repeat: no-repeat;\n}\n", ""]);

// exports


/***/ }),

/***/ 139:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
__webpack_require__(129);
__webpack_require__(153);


/***/ }),

/***/ 143:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(190);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(6)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/css-loader/index.js!../../node_modules/less-loader/dist/cjs.js!./user.less", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js!../../node_modules/less-loader/dist/cjs.js!./user.less");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 153:
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function($) {$(function(){
	let oTable =$('#tbUsers');
	oTable.DataTable();
	$("#addUser").click(function(){
		window.location.href = '/users/add';
	});
});

/**
* [createActions description] cria os botões de editar e excluir
* @param {[type]} object [description]
*/
function createActions(object){
	let html = "<button class='btn btn-sm btn-default' type='button' data-id='" + object._id + "'> <span class='glyphicon glyphicon-pencil'></span> Editar</button>";
	html += "<button class='btn btn-sm btn-default' type='button' data-id='" + object._id + "'> <span class='glyphicon glyphicon-trash'></span> Editar</button>";
	$("a").unbind().on('click', function(){
		if($(this).hasClass('btn-danger')){
			console.log("delete ", $(this).attr('data-id'));
		}
	});
	return html;
}


/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),

/***/ 190:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(5)(undefined);
// imports


// module
exports.push([module.i, ".card {\n  margin-top: 20px;\n  padding: 30px;\n  background-color: rgba(214, 224, 226, 0.2);\n  -webkit-border-top-left-radius: 5px;\n  -moz-border-top-left-radius: 5px;\n  border-top-left-radius: 5px;\n  -webkit-border-top-right-radius: 5px;\n  -moz-border-top-right-radius: 5px;\n  border-top-right-radius: 5px;\n  -webkit-box-sizing: border-box;\n  -moz-box-sizing: border-box;\n  box-sizing: border-box;\n}\n.card.hovercard {\n  position: relative;\n  padding-top: 0;\n  overflow: hidden;\n  text-align: center;\n  background-color: #fff;\n  background-color: #ffffff;\n}\n.card.hovercard .card-background {\n  height: 130px;\n}\n.card-background img {\n  -webkit-filter: blur(25px);\n  -moz-filter: blur(25px);\n  -o-filter: blur(25px);\n  -ms-filter: blur(25px);\n  filter: blur(25px);\n  margin-left: -100px;\n  margin-top: -200px;\n  min-width: 130%;\n}\n.card.hovercard .useravatar {\n  position: absolute;\n  top: 15px;\n  left: 0;\n  right: 0;\n}\n.card.hovercard .useravatar img {\n  width: 100px;\n  height: 100px;\n  max-width: 100px;\n  max-height: 100px;\n  -webkit-border-radius: 50%;\n  -moz-border-radius: 50%;\n  border-radius: 50% !important;\n  border: 5px solid rgba(255, 255, 255, 0.5);\n}\n.card.hovercard .card-info {\n  position: absolute;\n  bottom: 14px;\n  left: 0;\n  right: 0;\n}\n.card.hovercard .card-info .card-title {\n  padding: 0 5px;\n  font-size: 20px;\n  line-height: 1;\n  color: #262626;\n  background-color: rgba(255, 255, 255, 0.1);\n  -webkit-border-radius: 4px;\n  -moz-border-radius: 4px;\n  border-radius: 4px;\n}\n.card.hovercard .card-info {\n  overflow: hidden;\n  font-size: 12px;\n  line-height: 20px;\n  color: #737373;\n  text-overflow: ellipsis;\n}\n.card.hovercard .bottom {\n  padding: 0 20px;\n  margin-bottom: 17px;\n}\n.btn-pref .btn {\n  -webkit-border-radius: 0 !important;\n}\n", ""]);

// exports


/***/ }),

/***/ 213:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(7);
__webpack_require__(143);
module.exports = __webpack_require__(139);


/***/ }),

/***/ 7:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(12);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(6)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/css-loader/index.js!../../node_modules/less-loader/dist/cjs.js!./general.less", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js!../../node_modules/less-loader/dist/cjs.js!./general.less");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ })

},[213]);