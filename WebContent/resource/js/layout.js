const enderecoRest = '/Rest-web/rest';
var app = angular.module('academia', ['ngRoute','ngCookies','restangular']);

app.run(function(Auth) {
	Auth.setUser({role : 1});
});

app.factory('Auth',['$cookieStore',function($cookieStore) {
	var _user = $cookieStore.get('user');
	
	var setUser = function(user) {
		if(!user.role || user.role < 0) {
			user.role = 1;
		}
		_user = user;
		$cookieStore.put('user',_user);
	}
	
	return {
		isAuthorized: function(lvl) {
			return _user.role >= lvl;
		},
		setUser: setUser,
		isLoggedIn: function() {
			return _user ? true : false;
		},
		getUser: function() {
			return _user;
		},
		getId: function() {
			return _user ? _user._id : null;
		},
		getToken: function() {
			return _user ? _user.token : '';
		},
		logout: function() {
			$cookieStore.remove('user');
			_user = null;
		}
	}

}]);

app.run(function($rootScope, $location, Auth) {
	$rootScope.$on('$routeChangeStart', function(evt,next,curr) {
		if (!Auth.isAuthorized(next.access_level)) {
			if (Auth.isLoggedIn()) {
			// The user is logged in, but does not
			// have permissions to view the view
				$location.path('/');
			} else {
				$location.path('/login');
			}
		}
	});
});

app.config(['$routeProvider',function($routeProvider) {
    $routeProvider.when('/cadastro/empresa', {
        templateUrl: 'empresa/formularioEmpresa.html',
        controller: 'FormularioEmpresaController',
        access_level: 1
    }).when('/cadastro/unidade',{
    	templateUrl: 'unidade/formularioUnidade.html',
    	controller: 'FormularioUnidadeController',
    	access_level: 2
    }).when('/cadastro/usuario',{
    	templateUrl: 'usuario/formularioUsuario.html',
    	controller: 'FormularioUsuarioController',
    	access_level: 3
    }).otherwise({
    	redirectTo: '/teste'
    })
}]);

app.config(function(RestangularProvider) {
	RestangularProvider.setBaseUrl(enderecoRest);
});

app.factory('UnidadeService',['Restangular',function(Restangular) {
	return {
		objRest : Restangular.all('unidades'),
		post : function(unidade) {
			this.objRest.post(unidade).then(function(resp) {
				window.alert('deu certo');
			},function(err) {
				window.alert('deu erro');
			});
		}
	}
}]);

         
//
//app.controller('FormularioEmpresaController',function($scope,$routeParams,$resource){
//	var Empresa = $resource(enderecoRest + 'empresas/:empresaId', {empresaId: '@id'});
//	$scope.submeterFormulario = function() {
//		Empresa.save({},$scope.empresa,function(resp) {
//			window.alert('deu certo');
//		},function(err) {
//			window.alert('deu erro');
//		});
//		
//	};
//});

//app.controller('FormularioUsuarioController',function($scope,$resource) {
//	var Usuario = $resource(enderecoRest + 'usuarios/:usuarioId');
//	$scope.submeterFormulario = function() {
//	Usuario.save({},$scope.usuario,function(resp) {
//			
//	},function(err) {
//			
//	});
//	}
//});

app.controller('FormularioUnidadeController',function($scope,UnidadeService) {
	$scope.submeterFormulario = function() {
		UnidadeService.post($scope.unidade);
	}
});