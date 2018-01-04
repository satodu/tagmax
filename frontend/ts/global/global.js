var API_PORT = '3003';
var CLIENT_ACCOUNT = '';
if(CLIENT_ACCOUNT == ""){
	var URL_API = 'http://'+window.location.host+':'+ API_PORT;
}
else {
	var URL_API = 'http://'+window.location.host+':'+ API_PORT +'/' +CLIENT_ACCOUNT;
}



module.exports = {
	URL_API : URL_API,
}