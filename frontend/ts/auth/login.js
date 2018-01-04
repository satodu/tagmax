angular.module('Login',[])
.config(['$routeProvider', function($routeProvider){
	$routeProvider
	.when('/login', {
        templateUrl : "views/login/index.pug",
        controller : 'LoginController',
        controllerAs : 'Login'
    });
}])
.service('LoginService', LoginService)
.controller('LoginController', ['LoginService', LoginController]);

function LoginService($http){
	//const BASE_URL = 'http://localhost:3003/api/login';
	const BASE_URL = '/login'; 
	this.login = function(user){
		const method = "POST";
		const request = {
			url : BASE_URL,
			method  : method,
			contentType: 'application/json',
            dataType: 'json',
			data : user
		};
		return $http(request);
	}

	this.isEmpty = function (user){
		 // null and undefined are "empty"
	    if (user == null) return true;

	    // Assume if it has a length property with a non-zero value
	    // that that property is correct.
	    if (user.length > 0)    return false;
	    if (user.length === 0)  return true;

	    // If it isn't an object at this point
	    // it is empty, but it can't be anything *but* empty
	    // Is it empty?  Depends on your application.
	    if (typeof user !== "object") return true;

	    // Otherwise, does it have any properties of its own?
	    // Note that this doesn't handle
	    // toString and valueOf enumeration bugs in IE < 9
	    for (var key in user) {
	        if (hasOwnProperty.call(user, key)) return false;
	    }

	    return true;
	}
}

function LoginController(LoginService){
    var vm = this;
    vm.titulo = "Quero Participar!";
   	vm.submitForm = submitForm;
   	vm.returnMessage = returnMessage;
   	function submitForm(user){
   		LoginService
		.login(user)
		.then(function(data){
			vm.returnMessage(data);
			console.log("retorno login ", data); 
			vm.user = data;
			//console.log('retorno ', data);
			//window.location.href = '/campaign/add';
		})
		.catch(function(err){
			console.log('Error', err);
		});
   	}

   	function returnMessage(data){
   		if(data.data.status == false){
   			console.log('retorno false ', data);
		}else{
			console.log('retorno true ', data.data.user);
		}
   	}
}