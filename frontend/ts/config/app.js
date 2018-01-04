angular.module('StarterApp',['ngRoute', 'Login', 'Campaign', 'Dashboard', 'User', 'Company', require('angular-input-masks')])
    .config(function($locationProvider, $routeProvider){
        $routeProvider
        .when('/', {
	        templateUrl : "/",
	    });
    });

