var app = angular.module('rulk-login-service', ['rulk-restangular-config','rulk-auth']);

app.factory('LoginService', function($http, Restangular, Auth, $location,$q) {
	return {
		logar : function(user) {
			return $http.post('/Rest-web/login', {
				email : user.email,
				senha : user.senha
			});
//				.success(function(data, status, headers, config) {
//				redirecionar('/autenticado/inicio');
//			}).error(function(data, status, headers, config) {
//				window.alert('deu erro');
//			});
		}
	}
});