var URL_API = require('../global/global.js');

angular.module('User',[])
.config(['$routeProvider', function($routeProvider){
	$routeProvider
	.when('/user', {
        templateUrl : "views/user/index.pug",
        controller : 'UserController',
        controllerAs : 'User'
    })
    .when('/user/add', {
        templateUrl : "views/user/add.pug",
        controller : 'UserAddController',
        controllerAs : 'UserAdd'
    })
    .when('/user/update/:id', {
        templateUrl : "views/user/update.pug",
        controller : 'UserDetailsController',
        controllerAs : 'UserDetail'
    });
}])
.service('UserService', UserService)
.controller('UserController', ['UserService',UserController])
.controller('UserAddController', ['UserService',UserAddController])
.controller('UserDetailsController', UserDetailsController);

function UserService($http){
	const BASE_URL = URL_API.URL_API + '/api/user';
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

function UserDetailsController(UserService, $location){
	var arrString = $location.$$absUrl.split('/update');
	var arrNS     = arrString[1].split('#');
	var id        = arrNS[0].replace('/','');
	var vm        = this;
	vm.title      = "Editar Usuários";
	vm.user       = {};
	vm.save       = update;
	
	UserService.findById(id)
	.then(function(data){
		vm.user = data.data.result[0];
	})
	.catch(function(err){
		const swal = require('sweetalert2');
		swal({
			title : 'Error ao cadastrar!',
			text  : err.data.errors[0].message,
			type  : 'error',
			timer: 2000
		});
	});

	function update(user){
		user.company = user.company_id;
		user.company_id = document.getElementById('company_id').value;
		UserService.update(user)
		.then(function(data){
			vm.user = data;
			const swal = require('sweetalert2');
			swal({
				title : 'Atualizado com sucesso!',
				text  : 'Seu usuário foi atualizado com sucesso',
				type  : 'success',
			}).then(function(){
				window.location='/users';
			})
		})
		.catch(function(err){
			const swal = require('sweetalert2');
			swal({
				title : 'Error ao cadastrar!',
				text  : err.data.errors[0].message,
				type  : 'error',
				timer: 2000
			});
		});
	}
}
UserDetailsController.$inject = ['UserService','$location']; 

function UserAddController(UserService){
	var vm      = this;
	vm.title    = "Cadastrar Novos Usuários";
	vm.saveUser = submitForm;
	vm.company_id = '';

	//list users
   	UserService.list()
	.then(function(data){
		addPropertyCompany(data.data.result);
	})
	.catch(function(err){
		console.log('list user err ', err);
	});

	function addPropertyCompany(obj){
		for(let user in obj){
			for(let company in obj[user].company){
				vm.name = obj[user].name;
				obj[user].company[company].company_id = obj[user].company[company]._id;
				vm.company_id = obj[user].company[company]._id;
			}
		}
	}

	//add user
   	function submitForm(user){
   		user.company_id = document.getElementById('company_id').value;
   		UserService.save(user)
		.then(function(data){
			vm.user = data;
			const swal = require('sweetalert2');
			swal({
				title : 'Cadastrado com sucesso!',
				text  : 'Seu usuário foi cadastrado com sucesso',
				type  : 'success'
			}).then(function(){
				window.location='/users';
			})
		})
		.catch(function(err){
			const swal = require('sweetalert2');
			swal({
				title : 'Error ao cadastrar!',
				text  : err.data.errors[0].message,
				type  : 'error',
				timer: 2000
			});
		});
   	}
}

function UserController(UserService){
    var vm        = this;
    vm.indexTitle = "Usuários";
    vm.editTitle  = "Editar Usuários";
   	vm.delete     = deleteUser;
   	vm.edit       = redirect;

   	checkMyPermission();

   	function checkMyPermission(){
   		if(userParam.permission == "user"){ //user não pode deletar e nem mudar empresa
			getUsers();
			setTimeout(function(){
				$('.edit').hide();
				$('.delete').hide();
			},500);
		}else if(userParam.permission == "admin"){ // admin pode visualizar sua empresa e alterar os dados
			getUsers();
		}else{
			//list users
		   	UserService.list()
			.then(function(data){
				vm.users = data.data.result;
			})
			.catch(function(err){
				console.log('list user err ', err);
			});
		}
   	}

   	function getUsers(){
   		let arr = [];
		UserService.list()
		.then(function(data){
			for(let user in data.data.result){
				if(data.data.result[user].company_id == userParam.company_id){
					arr.push(data.data.result[user]);
				}
			}
			vm.users = arr;
		})
		.catch(function(err){
			console.log('list user err ', err);
		});
   	}

   	function deleteUser(user){
   		const filterUserRemoved = function(el){
   			return user._id != el._id;
   		};
   		const swal = require('sweetalert2');
   		swal({
   			title: 'Estou deletando usuário ' + user.name,
			text: 'Deseja realmente deletar esse usuário?',
			type: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Sim tenho certeza!'
   		}).then(function(){
   			UserService.remove(user)
			.then(function(data){
				if(data.statusText == 'OK'){
					vm.users = vm.users.filter(filterUserRemoved);
					swal({
						title : 'Deletado com sucesso!',
						text  : 'Usuário Deletado',
						type  : 'success',
					});
				}
			})
			.catch(function(err){
				console.log('deleteUser ', err);
			});
   		});
   	}
	function redirect(user){
   		window.location='#/users/update/' + user._id;
   	}
}