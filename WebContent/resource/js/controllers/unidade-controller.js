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

app.controller('UnidadesController', function($scope, $location,$filter,ngTableParams) {
	var data = [
	            {name: "Moroni", age: 50},
	            {name: "Tiancum", age: 43},
	            {name: "Jacob", age: 27},
	            {name: "Nephi", age: 29},
	            {name: "Enos", age: 34},
	            {name: "Tiancum", age: 43},
	            {name: "Jacob", age: 27},
	            {name: "Nephi", age: 29},
	            {name: "Enos", age: 34},
	            {name: "Tiancum", age: 43},
	            {name: "Jacob", age: 27},
	            {name: "Nephi", age: 29},
	            {name: "Enos", age: 34},
	            {name: "Tiancum", age: 43},
	            {name: "Jacob", age: 27},
	            {name: "Nephi", age: 29},
	            {name: "Enos", age: 34}
	        ];
	        $scope.data = data;

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

	        $scope.changeSelection = function(user) {
	            // console.info(user);
	        }
});

