var URL_API = require('../global/global.js');

angular.module('Campaign',[])
	.config(['$routeProvider', function($routeProvider){
		$routeProvider
		.when('/campaign', {
	        templateUrl : "views/campaign/index.pug",
	        controller : 'CampaignController',
	        controllerAs : 'Campaign'
	    })
	    .when('/campaign/add', {
	        templateUrl : "views/campaign/add.pug",
	        controller : 'CampaignAddController',
	        controllerAs : 'CampaignAdd'
	    })
	    .when('/campaign/edit/:id', {
	        templateUrl : "views/campaign/edit.pug",
	        controller : 'CampaignDetailsController',
	        controllerAs : 'CampaignDetail'
	    })
	    .when('/campaign/:id', {
	        templateUrl : "views/campaign/details.pug",
	        controller : 'CampaignDetailsController',
	        controllerAs : 'CampaignDetail'
	    })
	    .when('/campaigntag/add', {
	        templateUrl : "views/campaigntags/add.pug",
	        controller : 'CampaignTagAddController',
	        controllerAs : 'CampaignTagAdd'
	    });
	}])
	.service('CampaignService', CampaignService)
	.controller('CampaignController', ['CampaignService',CampaignController])
	.controller('CampaignAddController', ['CampaignService',CampaignAddController])
	.controller('CampaignDetailsController', CampaignDetailsController)
	.controller('CampaignTagAddController', ['CampaignService',CampaignTagAddController]);

function CampaignService($http){
	const BASE_URL     = URL_API.URL_API + '/api/campaigns';
	const BASE_URL_TAG = URL_API.URL_API + '/api/tag';
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
	this.savetag = function(user){
		const method = "POST";
		const request = {
			url : BASE_URL_TAG,
			method  : method,
			contentType: 'application/json',
            dataType: 'json',
			data : user
		};
		return $http(request);
	}
}

function CampaignController(CampaignService){
	var vm        = this;
    vm.title      = "Campanhas";
    vm.delete     = deleteCampaign;
   	vm.campaigns  = {};

	checkMyPermission();

	function checkMyPermission(){
		if(userParam.permission == "user"){ //user não pode deletar e nem mudar empresa
			getCampaigns();
			setTimeout(function(){
				$('.delete').hide();
			},500);
		}else if(userParam.permission == "admin"){ // admin pode visualizar sua empresa e alterar os dados
			getCampaigns();
		}else{
			//list companies
		   	CampaignService.list()
			.then(function(data){
				vm.campaigns = data.data.result;
			})
			.catch(function(err){
				console.log('list user err ', err);
			});
		}
	}

	function getCampaigns(){
   		let arr = [];
		CampaignService.list()
		.then(function(data){
			for(let campaign in data.data.result){
				if(data.data.result[campaign].company_id == userParam.company_id){
					arr.push(data.data.result[campaign]);
				}
			}
			vm.campaigns = arr;
		})
		.catch(function(err){
			console.log('list user err ', err);
		});
   	}

	function deleteCampaign(campaign){
		const filterCampaignRemoved = function(el){
   			return campaign._id != el._id;
   		};
   		const swal = require('sweetalert2');
   		swal({
   			title: 'Estou deletando empresa ' + campaign.name,
			text: 'Deseja realmente deletar esta Empresa?',
			type: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Sim tenho certeza!'
   		}).then(function(){
   			CampaignService.remove(campaign)
			.then(function(data){
				if(data.statusText == 'OK'){
					vm.campaigns = vm.campaigns.filter(filterCampaignRemoved);
					swal({
						title : 'Deletado com sucesso!',
						text  : 'I will close in 2 seconds.',
						type  : 'success'
					});
				}
			})
			.catch(function(err){
				console.log('deleteCompany ', err);
			});
   		});
	}
}

function CampaignAddController(CampaignService){
	var vm      = this;
	vm.title    = "Adicionar Campanha";
	vm.save     = submitForm;
	vm.campaign = {};

	//add Company
   	function submitForm(campaign){
   		if(campaign != undefined){
   			//adicionando a empresa ao usuário logado
	   		campaign.company_id = userParam.company_id;
   		}
   		CampaignService.save(campaign)
		.then(function(data){
			const swal = require('sweetalert2');
			swal({
				title : 'Cadastrado com sucesso!',
				text  : 'Sua campanha foi cadastrada com sucesso, agora comece a gerar suas URLs',
				type  : 'success'
			}).then(function(){
				window.location='/campaign';
			})
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

function CampaignDetailsController(CampaignService, $location){
	var id = 0;
	try{
		var arrString = $location.$$absUrl.split('/edit');
		var arrNS     = arrString[1].split('#');
		id            = arrNS[0].replace('/','');
	}catch(errors){
		var arrString = $location.$$absUrl.split('/campaign');
		var arrNS     = arrString[1].split('#');
		id            = arrNS[0].replace('/','');
	}
	var vm        = this;
	vm.title      = "Atualizar Campanha";
	vm.titleL     = "Detalha da Campanha";
	vm.campaigns  = {};
	vm.save       = update;

	CampaignService.findById(id)
	.then(function(data){
		vm.campaigns = data.data.result[0];
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

	function update(campaign){
		CampaignService.update(campaign)
		.then(function(data){
			vm.campaign = data;
			const swal = require('sweetalert2');
			swal({
				title : 'Atualizado com sucesso!',
				text  : 'Sua campanha foi renomeada com sucesso!',
				type  : 'success'
			}).then(function(){
				window.location='/campaign';
			})
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

CampaignDetailsController.$inject = ['CampaignService','$location'];

function CampaignTagAddController(CampaignService){
	var vm      = this;
	vm.title    = "Adicionar tags Campanha";
	vm.save     = submitForm;
	vm.change   = change;
	vm.changeGo = changeGoogle;
	vm.blurLP   = blurLandingPage;
	vm.campaign = {};
	vm.property = {};
	vm.htmlAt   = '';
	vm.htmlGo   = '';

	function blurLandingPage(value){
		vm.campaign.url_complete = value + "?";
	}

	function change(id,value){
		let result_at = document.getElementById('result_at').value;
		if(value == '' || value == undefined){
			return false;
		}
		vm.property[id] = value;
		for(let key in vm.property){
			if(vm.property[key] != undefined){
				if(vm.htmlAt == ''){ 
					vm.htmlAt += 'xtor=' + atOptions(key,value) +'-' +uniqueID();
				}else{
					vm.htmlAt += '-' + '[' + checkSpaces(vm.property[key]) + ']';
				}
			}
		}
		vm.property = {};
	}

	function changeGoogle(id, value){
		if(value == '' || value == undefined){
			return false;
		}
		vm.property[id] = value;
		for(let key in vm.property){
			if(vm.property[key] != undefined){
				if(vm.htmlGo == ''){
					vm.htmlGo += key + '=' + checkSpaces(vm.property[key]) + '&';
				}else{
					vm.htmlGo += '&' + key + '=' + checkSpaces(vm.property[key]);
				}
			}
		}
		vm.property = {};
	}

	function checkSpaces(string){
		return string.replace(/ /g, '%20');
	}

	//add Company
   	function submitForm(campaign){
   		CampaignService.savetag(unionTagsArrayObject(campaign))
		.then(function(data){
			const swal = require('sweetalert2');
			swal({
				title : 'Cadastrado com sucesso!',
				text  : 'Sua URL foi cadastrada.',
				type  : 'success'
			}).then(function(){
				window.location='/campaign/' + idCampaign;
			})
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

   	function unionTagsArrayObject(campaign){
   		var array = [];
   		var arrAt = [];
   		let tag   = {};
   		campaign.campaign_id = idCampaign;
   		for(let obj in campaign){
   			//tags google
   			if(obj.indexOf("utm") == 0){
   				tag.utm_source   = campaign.utm_source;
   				tag.utm_medium   = campaign.utm_medium;
   				tag.utm_campaign = campaign.utm_campaign;
   				tag.utm_term     = campaign.utm_term;
   				tag.utm_content  = campaign.utm_content;
   				tag.ga_result    = vm.htmlGo;
   				array.push(tag);
   				campaign.tagsGoogle   = array;
   				array = [];
   				tag   = {};
   			}
   			if(obj.indexOf("type_at") == 0){
   				tag.type_at                = campaign.type_at;
   				tag.ad_group               = campaign.ad_group;
   				tag.ad_variant             = campaign.ad_variant;
   				tag.exact_purchase_keyword = campaign.exact_purchase_keyword;
   				tag.plataform              = campaign.plataform;
   				tag.search                 = campaign.search;
   				tag.email_campaing         = campaign.email_campaing;
				tag.send_date              = campaign.send_date;
				tag.link                   = campaign.link;
				tag.recipient              = campaign.recipient;
				tag.exact_date_and_time    = campaign.exact_date_and_time;
				tag.creative               = campaign.creative;
				tag.variant                = campaign.variant;
				tag.format                 = campaign.format;
				tag.support_site           = campaign.support_site;
				tag.general_position       = campaign.general_position;
				tag.position_detail        = campaign.position_detail;
				tag.affiliate_type         = campaign.affiliate_type;
				tag.affiliate              = campaign.affiliate;
   				tag.result_at              = vm.htmlAt;
   				array.push(tag);
   				campaign.tagsAt            = array;
   				array = [];
   				tag   = {};
   			}
   		}
   		campaign.url_complete = campaign.url_landing_page;
   		if(vm.htmlGo != ''){
   			campaign.url_complete += '?' + vm.htmlGo;
   		}
   		if(vm.htmlAt != '' && vm.htmlGo != ''){
   			campaign.url_complete += '&'+vm.htmlAt
   		}
   		if(vm.htmlAt != '' && vm.htmlGo == ''){
   			campaign.url_complete += '?' + vm.htmlAt;
   		}
   		return campaign;
   	}

   	function atOptions(id, value){
   		if(id == 'type_at' && value == 'Sponsor Links') {
   			return 'SEC';
   		}else if(id == 'type_at' && value == 'Email Campaigns') {
   			return 'EREC';
   		}else if(id == 'type_at' && value == 'Advertising') {
   			return 'AD';
   		}else if(id == 'type_at' && value == 'Affiliation') {
   			return 'AL';
   		}else if(id == 'type_at' && value == 'RSS') {
   			return 'RSS';
   		}
   	}

   	function uniqueID(){
   		return Math.floor((1 + Math.random()) * 0x10000);
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
