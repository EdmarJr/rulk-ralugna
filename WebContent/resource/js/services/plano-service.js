var app = angular.module('rulk-plano-service', ['rulk-restangular-config']);

app.factory("PlanoService", [ 'Restangular', function(Restangular) {
	return {
		objRest : Restangular.all('planos'),

	}
} ]);