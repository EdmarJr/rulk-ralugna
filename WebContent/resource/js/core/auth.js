var app = angular.module('rulk-auth', [ 'ngCookies', 'rulk-restangular-config' ]);

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
		} ]);