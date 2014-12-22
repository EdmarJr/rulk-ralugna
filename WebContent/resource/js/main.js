const enderecoRest = '/Rest-web/rest';
var app = angular.module('academia', ['smart-table','ngRoute','ngCookies','restangular']);

app.factory('Auth',['$cookieStore',function($cookieStore) {
	var _user = $cookieStore.get('user');
	
	var setUser = function(user) {
		
		if(user.roles && user.roles[0] == "ADMIN") {
			user.role = 10;
		}
		if(!user.role || user.role < 0) {
			user.role = 1;
		}
		_user = user;
		$cookieStore.put('user',_user);
	}
	
	if(!_user) {
		setUser({role : 1});
	}
	
	return {
		isAuthorized: function(lvl) {
			return _user.role >= lvl;
		},
		setUser: setUser,
		isLoggedIn: function() {
			return _user.role > 1 ;
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
    	access_level: 8
    }).when('/cadastro/usuario',{
    	templateUrl: 'usuario/formularioUsuario.html',
    	controller: 'FormularioUsuarioController',
    	access_level: 3
    }).when('/login',{
    	templateUrl: 'login.html',
    	controller: 'FormLoginController',
    	access_level: 1
    }).when('/autenticado/inicio',{
    	templateUrl: 'autenticado/inicio.html',
    	controller: 'InicioController',
    	access_level: 2
    }).when('/autenticado/administrativo/cadastro/cliente',{
    	templateUrl: 'autenticado/administrativo/cliente/formCliente.html',
    	controller: 'CadastroClienteController',
    	access_level: 2
    }).when('/autenticado/administrativo/consulta/clientes',{
    	templateUrl: 'autenticado/administrativo/cliente/showClientes.html',
    	controller: 'ConsultaClienteController',
    	access_level: 2
    }).otherwise({
    	redirectTo: '/autenticado/inicio'
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
		},
		getUnidadesDisponiveis : function(promise) {
			this.objRest.getList().then(promise,function(err) {
				window.alert("deu erro");
			});
		},
		getPlanosDisponiveis: function(unidade, callback) {
			Restangular.one('unidades',unidade.id).getList('planos').then(callback,function(err) {
				window.alert("erro");
			});
		}
	}
}]);

app.factory('ClienteService',['Restangular',function(Restangular) {
	return {
		objRest: Restangular.all('clientes'),
		post: function(cliente,callback) {
			cliente.type = "com.rest.entitys.Cliente"
			this.objRest.post(cliente).then(callback,function(err) {
				
			}); 
		}
	}
}]);

app.factory('LoginService',['Restangular','Auth','$location',function(Restangular,Auth,$location) {
	return {
		objRest: Restangular.all('authentication'),
		post: function(user)  {
			this.objRest.post(user).then(function(resp) {
				Auth.setUser({roles : resp.roles, email : resp.userEmail, token: resp.token});
				$location.path('/autenticado/inicio');
			},function(err) {
				window.alert('deu erro');
			});
		}
	}
}]);

app.factory("PlanoService",['Restangular',function(Restangular) {
	return {
		objRest: Restangular.all('planos'),
		
	}
}]);


app.controller('FormLoginController',function($scope,LoginService) {
	$scope.submitForm = function() {
		LoginService.post($scope.user);
	}
});

app.controller('InicioController',function($scope,$route,$location) {
	$scope.irParaAdministracao = function() {
		$location.path('/autenticado/administrativo/cadastro/cliente');
	}
});

app.controller('CadastroClienteController',function($scope,$route,$location,UnidadeService,ClienteService) {
	UnidadeService.getUnidadesDisponiveis(function (resp) {
		$scope.unidades = resp;
	});
	
	$scope.atualizarPlanos = function() {
		UnidadeService.getPlanosDisponiveis($scope.cliente.unidade,function(resp) {
			$scope.planos = resp;
		})
	};
	
	$scope.cadastrarCliente = function() {
		ClienteService.post($scope.cliente,function(resp) {
			window.alert("foi bonito foooi");
		});
	}
});

app.controller('ConsultaClienteController',['$scope', '$timeout',function($scope,$timeout) {
	
	var nameList = ['Pierre', 'Pol', 'Jacques', 'Robert', 'Elisa','Edmar','Maria','Teste','Goku','GOHAN'];
    var familyName = ['Dupont', 'Germain', 'Delcourt', 'bjip', 'Menez','Fagundes','teste','meneguel'];

    $scope.isLoading = false;
    $scope.rowCollection = [];


    function createRandomItem() {
        var
            firstName = nameList[Math.floor(Math.random() * 4)],
            lastName = familyName[Math.floor(Math.random() * 4)],
            age = Math.floor(Math.random() * 100),
            email = firstName + lastName + '@whatever.com',
            balance = Math.random() * 3000;

        return {
            firstName: firstName,
            lastName: lastName,
            age: age,
            email: email,
            balance: balance
        };
    }

    function getAPage() {
        var data = [];
        for (var j = 0; j < 20; j++) {
            data.push(createRandomItem());
        }
        return data;
    }

    var lastStart = 0;
    var maxNodes = 40;

    $scope.callServer = function getData(tableState) {

        //here you could create a query string from tableState
        //fake ajax call
        $scope.isLoading = true;

        $timeout(function () {

            //if we reset (like after a search or an order)
            if (tableState.pagination.start === 0) {
                $scope.rowCollection = getAPage();
            } else {
                //we load more
                $scope.rowCollection = $scope.rowCollection.concat(getAPage());

                //remove first nodes if needed
                if (lastStart < tableState.pagination.start && $scope.rowCollection.length > maxNodes) {
                    //remove the first nodes
                    $scope.rowCollection.splice(0, 20);
                }
            }

            lastStart = tableState.pagination.start;

            $scope.isLoading = false;
        }, 1000);

    };

    $scope.rowCollection = getAPage();
}]);


