var URL_API = require('../global/global.js');

angular.module('Company',[])
	.config(['$routeProvider', function($routeProvider){
		$routeProvider
		.when('/companies', {
	        templateUrl : "views/company/index.pug",
	        controller : 'CompanyController',
	        controllerAs : 'Company'
	    })
	    .when('/companies/add', {
	        templateUrl : "views/company/add.pug",
	        controller : 'CompanyAddController',
	        controllerAs : 'CompanyAdd'
	    })
	    .when('/companies/edit/:id', {
	        templateUrl : "views/company/edit.pug",
	        controller : 'CompanyDetailsController',
	        controllerAs : 'CompanyDetail'
	    })
	    .when('/companies/:id', {
	        templateUrl : "views/company/details.pug",
	        controller : 'CompanyDetailsController',
	        controllerAs : 'CompanyDetail'
	    });
	}])
	.service('CompanyService', CompanyService)
	.controller('CompanyController', ['CompanyService',CompanyController])
	.controller('CompanyAddController', ['CompanyService',CompanyAddController])
	.controller('CompanyDetailsController', CompanyDetailsController);

function CompanyService($http){
	const BASE_URL = URL_API.URL_API + '/api/company';
	this.save = function(user){
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
	this.list = function(){
		const method = "GET";
		const request = {
			url : BASE_URL,
			method  : method,
			contentType: 'application/json',
            dataType: 'json'
		};
		return $http(request);
	}
	this.remove = function(user){
		const method = "DELETE";
		const request = {
			url : BASE_URL + "/" + user._id,
			method  : method
		};
		return $http(request);
	}
	this.findById = function(id){
		const method = "GET";
		const request = {
			url : BASE_URL + '/' + id,
			method  : method,
			contentType: 'application/json',
            dataType: 'json'
		};
		return $http(request);
	}
	this.update = function(user){
		const method = "PUT";
		const request = {
			url : BASE_URL + '/' + user._id,
			method  : method,
			contentType: 'application/json',
            dataType: 'json',
			data : user
		};
		return $http(request);
	}
}

function CompanyController(CompanyService){
    var vm        = this;
    vm.title = "Empresas";
    vm.delete     = deleteCompany;
   	vm.companies  = {};
   	vm.company_id = '';
   	vm.permission = checkMyPermission;
   	
   	checkMyPermission();

	function checkMyPermission(){
		if(userParam.permission == "user"){ //user não pode deletar e nem mudar empresa
			CompanyService.findById(userParam.company_id)
			.then(function(data){
				vm.companies = data.data.result;
				vm.company_id = {_id : vm.companies[0]._id, name : vm.companies[0].name};
			})
			.catch(function(err){
				console.log('list user err ', err);
			});
			setTimeout(function(){
				$('.edit').hide();
				$('.delete').hide();
			},500);
		}else if(userParam.permission == "admin"){ // admin pode visualizar sua empresa e alterar os dados
			CompanyService.findById(userParam.company_id)
			.then(function(data){
				vm.companies = data.data.result;
				vm.company_id = {_id : vm.companies[0]._id, name : vm.companies[0].name};
			})
			.catch(function(err){
				console.log('list user err ', err);
			});
			setTimeout(function(){
				$('.delete').hide();
			},500);
		}else{
			//list companies
		   	CompanyService.list()
			.then(function(data){
				vm.companies = data.data.result;
				vm.company_id = {_id : vm.companies[0]._id, name : vm.companies[0].name};
			})
			.catch(function(err){
				console.log('list user err ', err);
			});
		}
	}

   	function deleteCompany(company){
   		const filterCompanyRemoved = function(el){
   			return company._id != el._id;
   		};
   		const swal = require('sweetalert2');
   		swal({
   			title: 'Estou deletando empresa ' + company.name,
			text: 'Deseja realmente deletar esta Empresa?',
			type: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Sim tenho certeza!'
   		}).then(function(){
   			CompanyService.remove(company)
			.then(function(data){
				if(data.statusText == 'OK'){
					vm.companies = vm.companies.filter(filterCompanyRemoved);
					swal({
						title : 'Deletado com sucesso!',
						text  : 'I will close in 2 seconds.',
						type  : 'success',
						timer: 2000
					});
				}
			})
			.catch(function(err){
				console.log('deleteCompany ', err);
			});
   		});
   	}
}

function CompanyAddController(CompanyService){
	var vm      = this;
	vm.title    = "Adicionar Empresa";
	vm.save = submitForm;

	//add Company
   	function submitForm(company){
   		CompanyService.save(company)
		.then(function(data){
			const swal = require('sweetalert2');
			swal({
				title : 'Cadastrado com sucesso!',
				text  : 'I will close in 2 seconds.',
				type  : 'success',
				timer: 2000
			}).then(function(){}
			,function(dismiss){
				if(dismiss === 'timer')
					window.location='/companies';
			});
		})
		.catch(function(err){
			const swal = require('sweetalert2');
			var message = getMessageError(err.data.errors);
			swal({
				html  : true,
				title : 'Error ao cadastrar!',
				html  : '<p>' + err.data.errors[0].message + '\n' + message + '</p>',
				type  : 'error',
				timer: 4000
			});
		});
   	}

   	function getMessageError(errors){
   		var message = '';
   		for(let error of errors){
   			message  += interateErrorsMessage(error.errors);
   		}
   		return message;
   	}

   	function interateErrorsMessage(obj, needs){
   		var message = '';
   		Object.getOwnPropertyNames(obj).forEach(function(key, idx, array){
   			message += '<br/>' + obj[key].message;
   		});
   		return message;
   	}

   	function iterate(obj, needs) {
   		var message = '';
	    for (var property in obj) {
	        if (obj.hasOwnProperty(property)) {
	            if (typeof obj[property] == "object") {
	                iterate(obj[property], needs);
	            }
	            else {
	            	if(property == needs){
	                	message += obj[property] + '\n';
	                }
	            }
	        }
	    }
	}
}

function CompanyDetailsController(CompanyService, $location){
	var id = 0;
	try{
		var arrString = $location.$$absUrl.split('/edit');
		var arrNS     = arrString[1].split('#');
		id            = arrNS[0].replace('/','');
	}catch(errors){
		var arrString = $location.$$absUrl.split('/companies');
		var arrNS     = arrString[1].split('#');
		id            = arrNS[0].replace('/','');
	}
	var vm        = this;
	vm.title      = "Atualizar Empresa";
	vm.titleL     = "Empresa";
	vm.company    = {};
	vm.save       = update;

	CompanyService.findById(id)
	.then(function(data){
		vm.company = data.data.result[0];
	})
	.catch(function(err){
		const swal = require('sweetalert2');
		var message = getMessageError(err.data.errors);
		swal({
			html  : true,
			title : 'Error ao cadastrar!',
			html  : '<p>' + err.data.errors[0].message + '\n' + message + '</p>',
			type  : 'error',
			timer: 4000
		});
	});

	function update(user){
		CompanyService.update(user)
		.then(function(data){
			vm.company = data;
			const swal = require('sweetalert2');
			swal({
				title : 'Atualizado com sucesso!',
				text  : 'I will close in 2 seconds.',
				type  : 'success',
				timer: 2000
			}).then(function(){}
			,function(dismiss){
				if(dismiss === 'timer')
					window.location='/companies';
			});
		})
		.catch(function(err){
			const swal = require('sweetalert2');
			var message = getMessageError(err.data.errors);
			swal({
				html  : true,
				title : 'Error ao cadastrar!',
				html  : '<p>' + err.data.errors[0].message + '\n' + message + '</p>',
				type  : 'error',
				timer: 4000
			});
		});
	}

	function getMessageError(errors){
   		var message = '';
   		for(let error of errors){
   			message  += interateErrorsMessage(error.errors);
   		}
   		return message;
   	}

   	function interateErrorsMessage(obj, needs){
   		var message = '';
   		Object.getOwnPropertyNames(obj).forEach(function(key, idx, array){
   			message += '<br/>' + obj[key].message;
   		});
   		return message;
   	}
}

CompanyDetailsController.$inject = ['CompanyService','$location']; 