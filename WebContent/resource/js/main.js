var app = angular.module('rulk', ['rulk-restangular-config','rulk-auth','rulk-routes','rulk-login-controller','rulk-unidade-controller','rulk-cadastro-cliente-controller','rulk-inicio-controller']);

function adicionarMensagemSuccesso(scope,mensagem) {
	scope.mensagemSucesso = mensagem;
	setTimeout(function() {
		scope.mensagemSucesso = undefined;
		scope.$apply();
	},3000);
}