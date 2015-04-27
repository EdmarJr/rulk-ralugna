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


app.directive('inclusaoEdicaoUnidade', function() {
  return {
	restrict:'A',
    templateUrl: 'unidade/inclusaoEdicaoUnidade.html',
    scope: true,
    controller: function($scope,UnidadeService) {
    	$scope.salvarUnidade = function() {
    		UnidadeService.salvarUnidade($scope.unidade).then(function(response){
    			adicionarMensagemSuccesso($scope.$parent,"Unidade foi salva com sucesso.");
    			$('#myModal').modal('hide');
    		},function(err){
    			window.alert("deu erro");
    		});
    	}
    }
  };
});

app.controller('UnidadesController', function($scope, $location,$filter,ngTableParams,UnidadeService) {
	var data = [];

	UnidadeService.getUnidadesDisponiveis().then(function(resp) {
		$scope.data = resp;
		criarTabelaUnidades($scope.data);
	},function(err) {
		window.alert(err);
	});

	function criarTabelaUnidades(data) {
        $scope.tableParams = new ngTableParams({
            page: 1,            // show first page
            count: 10,          // count per page
            filter: {
                //name: 'M'       // initial filter
            },
            sorting: {
                //name: 'asc'     // initial sorting
            }
        }, {
            total: data.length, // length of data
            getData: function ($defer, params) {
                // use build-in angular filter
                var filteredData = params.filter() ?
                        $filter('filter')(data, params.filter()) :
                        data;
                var orderedData = params.sorting() ?
                        $filter('orderBy')(filteredData, params.orderBy()) :
                        data;

                params.total(orderedData.length); // set total for recalc pagination
                $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
            }
        });
	}

    $scope.changeSelection = function(user) {
        // console.info(user);
    }
    
    $scope.acionarInclusao = function() {
    	$('#myModal').modal('show');
    }
    
    $scope.acionarAlteracao = function(idUnidade) {
		UnidadeService.obterPorIdUnidade(idUnidade).then(function(retorno) {
			$scope.unidade = retorno;
			$scope.acionarInclusao();
		},function(erro){
			window.alert(erro);
		});
    }
	        
	        
});

