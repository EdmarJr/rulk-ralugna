var app = angular.module('rulk-cliente-service', ['rulk-restangular-config']);

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