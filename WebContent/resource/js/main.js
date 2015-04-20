const
enderecoRest = '/Rest-web';
var app = angular.module('academia', [ 'smart-table', 'ngRoute', 'ngCookies',
		'restangular' ]);

app.factory('Auth', [
		'$cookieStore',
		'Restangular',
		function($cookieStore, Restangular) {

			return {
				getUsuarioLogado : function(callback) {
					Restangular.one("usuarios/logado").get().then(
							function(retorno) {
								console.log(retorno);
								callback(retorno);
							}, function(err) {
								console.log(err);
							});
				},
				isUsuarioLogadoAuthorized : function(callback) {
					this.getUsuarioLogado(function(usuarioLogado, err) {
						if (usuarioLogado) {
							callback(usuarioLogado);
						} else {
							callback(undefined, {
								msg : "usuario não está logado"
							});
						}
					});
				}
			}

			// var setUser = function(user) {
			//		
			// if(user.roles && user.roles[0] == "ADMIN") {
			// user.role = 10;
			// }
			// if(!user.role || user.role < 0) {
			// user.role = 1;
			// }
			// _user = user;
			// $cookieStore.put('user',_user);
			// }
			//	
			// if(!_user) {
			// setUser({role : 1});
			// }
			//	
			// return {
			// isAuthorized: function(lvl) {
			// return _user.role >= lvl;
			// },
			// setUser: setUser,
			// isLoggedIn: function() {
			// return _user.role > 1 ;
			// },
			// getUser: function() {
			// return _user;
			// },
			// getId: function() {
			// return _user ? _user._id : null;
			// },
			// getToken: function() {
			// return _user ? _user.token : '';
			// },
			// logout: function() {
			// $cookieStore.remove('user');
			// _user = null;
			// }
			// }

		} ]);

app.run(function($rootScope, $location, Auth) {
	$rootScope.$on('$routeChangeStart', function(evt, next, curr) {
		Auth.isUsuarioLogadoAuthorized(function(usuarioLogado, err) {
			if (err) {
				evt.preventDefault();
				$rootScope.$evalAsync(function() {
					$location.path('/login');
				});
			} else {
				evt.preventDefault();
				$rootScope.$evalAsync(function() {
					$location.path('/');
				});
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
		controller : 'FormularioUnidadeController',
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
	}).otherwise({
		redirectTo : '/autenticado/inicio'
	})
} ]);

app.config(function(RestangularProvider) {
	RestangularProvider.setBaseUrl(enderecoRest);
});

app.factory('UnidadeService', [
		'Restangular',
		function(Restangular) {
			return {
				objRest : Restangular.all('secured/unidades'),
				post : function(unidade) {
					this.objRest.post(unidade).then(function(resp) {
						window.alert('deu certo');
					}, function(err) {
						window.alert('deu erro');
					});
				},
				getUnidadesDisponiveis : function(promise) {
					this.objRest.getList().then(promise, function(err) {
						window.alert("deu erro");
					});
				},
				getPlanosDisponiveis : function(unidade, callback) {
					Restangular.one('unidades', unidade.id).getList('planos')
							.then(callback, function(err) {
								window.alert("erro");
							});
				}
			}
		} ]);

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
		$location(endereco);
	}
	
	
	return {
		logar : function(user) {
			var $location = $location;
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
