var app = angular.module('rulk-inicio-controller', []);

app.controller('InicioController', function($scope, $location) {
	$scope.irParaAdministracao = function() {
		$location.path('/autenticado/administrativo/cadastro/cliente');
	}
});