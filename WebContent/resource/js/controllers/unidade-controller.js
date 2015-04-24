var app = angular.module('rulk-unidade-controller', ['rulk-unidade-service','ngTable']);

app.controller('UnidadeController', function($scope, $location,
		UnidadeService) {
		$scope.submeterFormulario = function() {
			UnidadeService.incluirUnidade($scope.unidade).then(function(sucesso){
				$scope.unidade = {};
				$scope.messageSuccess = "Unidade foi incluida com sucesso";
			},function(erro){
				$scope.messageError = erro.headers().msgerro;
			});
		}
});
