var app = angular.module('rulk-routes', ['ngRoute','rulk-auth']);

app.run(function($rootScope, $location, Auth) {
	$rootScope.$on('$routeChangeStart', function(evt, next, curr) {
		Auth.isUsuarioLogadoAuthorized(function(usuarioLogado, err) {
			if (err) {
				evt.preventDefault();
				$rootScope.$evalAsync(function() {
					/*$location.path('/login');*/
				});
			} else {
//				evt.preventDefault();
//				$rootScope.$evalAsync(function() {
//					$location.path('/');
//				});
			}
		});
	})
});

app.config([ '$routeProvider', function($routeProvider) {
	$routeProvider.when('/cadastro/empresa', {
		templateUrl : 'empresa/formularioEmpresa.html',
		controller : 'FormularioEmpresaController',
		access_level : 1
	}).when('/cadastro/unidade', {
		templateUrl : 'unidade/formularioUnidade.html',
		controller : 'UnidadeController',
		access_level : 8
	}).when('/cadastro/usuario', {
		templateUrl : 'usuario/formularioUsuario.html',
		controller : 'FormularioUsuarioController',
		access_level : 3
	}).when('/login', {
		templateUrl : 'login.html',
		controller : 'FormLoginController',
		access_level : 1
	}).when('/autenticado/inicio', {
		templateUrl : 'autenticado/inicio.html',
		controller : 'InicioController',
		access_level : 2
	}).when('/autenticado/administrativo/cadastro/cliente', {
		templateUrl : 'autenticado/administrativo/cliente/formCliente.html',
		controller : 'CadastroClienteController',
		access_level : 2
	}).when('/autenticado/administrativo/consulta/clientes', {
		templateUrl : 'autenticado/administrativo/cliente/showClientes.html',
		controller : 'ConsultaClienteController',
		access_level : 2
	}).when('/unidades', {
		templateUrl : 'unidade/unidades.html',
		controller : 'UnidadesController',
		access_level : 2
	}).otherwise({
		redirectTo : '/autenticado/inicio'
	})
} ]);