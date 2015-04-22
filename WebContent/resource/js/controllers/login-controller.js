var app = angular.module('rulk-login-controller', ['rulk-login-service']);

app.controller('FormLoginController', function($scope, LoginService,$location) {
	$scope.submitForm = function() {
		LoginService.logar($scope.user).then(function(response) {
			$location.path('/autenticado/inicio');
		},function(erro){
			$scope.messageError = erro.headers().msgerro;
		});
		
	}
});