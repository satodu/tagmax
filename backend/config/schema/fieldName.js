const quark_get      = require('../quarks/quark-toUpper');
const quark_set      = require('../quarks/quark-toLower');
const quark_validade = require('../quarks/quark-validate-string-length3');

module.exports = {
	type : String,
	get  : quark_get,
	set  : quark_get,
	validate : quark_validade,
	required : true,
	index : true
};