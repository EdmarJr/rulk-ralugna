const enderecoRest = 'http://localhost\\:8080/Rest-web/rest/';

var app = angular.module('academia', ['ngRoute','ngResource']);

app.config(['$routeProvider',function($routeProvider) {
    $routeProvider.when('/cadastro/empresa', {
        templateUrl: 'empresa/formularioEmpresa.html',
        controller: 'FormularioEmpresaController'
    }).when('/cadastro/unidade',{
    	templateUrl: 'unidade/formularioUnidade.html',
    	controller: 'FormularioUnidadeController'
    }).when('/cadastro/usuario',{
    	templateUrl: 'usuario/formularioUsuario.html',
    	controller: 'FormularioUsuarioController'
    })
}]);

app.factory('UnidadeService',function($resource) {
	return $resource(enderecoRest + 'unidades/:unidadeId',{unidadeId: '@id'});
});

app.run(['$rootScope','$location',function($rootScope,$location) {
    $rootScope.$on('$routeChangeStart',function(evt,next,current) {
    });
}]);
         

app.controller('FormularioEmpresaController',function($scope,$routeParams,$resource){
	var Empresa = $resource(enderecoRest + 'empresas/:empresaId', {empresaId: '@id'});
	$scope.submeterFormulario = function() {
		Empresa.save({},$scope.empresa,function(resp) {
			window.alert('deu certo');
		},function(err) {
			window.alert('deu erro');
		});
		
	};
});

app.controller('FormularioUnidadeController',function($scope,$resource) {
	var Unidade = $resource(enderecoRest + 'unidades/:unidadeId');
	$scope.submeterFormulario = function() {
		Unidade.save({},$scope.unidade,function(resp){
			window.alert('deu certo');
		},function(err) {
			window.alert('deu erro');
		});
	}
});

app.controller('FormularioUsuarioController',function($scope,$resource) {
	var Usuario = $resource(enderecoRest + 'usuarios/:usuarioId');
	$scope.submeterFormulario = function() {
	Usuario.save({},$scope.usuario,function(resp) {
			
	},function(err) {
			
	});
	}
});
