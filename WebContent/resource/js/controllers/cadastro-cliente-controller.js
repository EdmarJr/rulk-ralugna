var app = angular.module('rulk-cadastro-cliente-controller', ['rulk-unidade-service','rulk-cliente-service' ]);

app.controller('CadastroClienteController', function($scope, $location,
		UnidadeService, ClienteService) {
	UnidadeService.getUnidadesDisponiveis().then(function(resp) {
		$scope.unidades = resp;
	},function(err) {
		window.alert(err);
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
