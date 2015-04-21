var app = angular.module('rulk', ['rulk-restangular-config','rulk-auth','rulk-routes','rulk-unidade-service']);

app.factory('ClienteService', [ 'Restangular', function(Restangular) {
	return {
		objRest : Restangular.all('clientes'),
		post : function(cliente, callback) {
			cliente.type = "com.rest.entitys.Cliente"
			this.objRest.post(cliente).then(callback, function(err) {

			});
		}
	}
} ]);

app.factory('LoginService', function($http, Restangular, Auth, $location) {
	function redirecionar(endereco) {
		$location.path(endereco);
	}

	return {
		logar : function(user) {
			$http.post('/Rest-web/login', {
				email : user.email,
				senha : user.senha
			}).success(function(data, status, headers, config) {
				redirecionar('/autenticado/inicio');
			}).error(function(data, status, headers, config) {
				window.alert('deu erro');
			});
		}
	}
});

app.factory("PlanoService", [ 'Restangular', function(Restangular) {
	return {
		objRest : Restangular.all('planos'),

	}
} ]);

app.controller('FormLoginController', function($scope, LoginService) {
	$scope.submitForm = function() {
		LoginService.logar($scope.user);
	}
});

app.controller('InicioController', function($scope, $route, $location) {
	$scope.irParaAdministracao = function() {
		$location.path('/autenticado/administrativo/cadastro/cliente');
	}
});

app.controller('CadastroClienteController', function($scope, $route, $location,
		UnidadeService, ClienteService) {
	UnidadeService.getUnidadesDisponiveis(function(resp) {
		$scope.unidades = resp;
	});

	$scope.atualizarPlanos = function() {
		UnidadeService.getPlanosDisponiveis($scope.cliente.unidade, function(
				resp) {
			$scope.planos = resp;
		})
	};

	$scope.cadastrarCliente = function() {
		ClienteService.post($scope.cliente, function(resp) {
			window.alert("foi bonito foooi");
		});
	}
});

app.controller('ConsultaClienteController', [ '$scope', '$timeout',
		function($scope, $timeout) {

		} ]);
