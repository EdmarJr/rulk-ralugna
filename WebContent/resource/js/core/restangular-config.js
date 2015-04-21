const enderecoRest = '/Rest-web';
var app = angular.module('rulk-restangular-config', ['restangular' ]);

app.config(function(RestangularProvider) {
	RestangularProvider.setBaseUrl(enderecoRest);
});