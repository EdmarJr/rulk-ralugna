var app = angular.module('rulk-login-controller', ['rulk-login-service' ]);

app.controller('FormLoginController', function($scope, LoginService) {
	$scope.submitForm = function() {
		LoginService.logar($scope.user);
	}
});