var app = angular.module('usuario',[]);
app.filter('capitalize',function() {
    return function(input) {
        if(input) {
            return input[0].toUpperCase() + input.slice(1);
        }
    };
});

app.directive('terminacoma',function() {
    return {
        require : 'ngModel',
        link : function(scope, ele, attrs, c) {
            scope.$watch(attrs.ngModel,function() {
                c.$setValidity('terminaComA',true);
            });
        }
    }
});
app.directive('ngFocus',[function() {
    var FOCUS_CLASS = "ng-focused";
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function(scope, element, attrs, ctrl) {
            ctrl.$focused = false;
            element.bind('focus',function(evt) {
                element.addClass(FOCUS_CLASS);
                scope.$apply(function() {
                    ctrl.$focused = true;
                });
            }).bind('blur',function(evt) {
                element.removeClass(FOCUS_CLASS);
                scope.$apply(function() {
                    ctrl.$focused = false;
                });
            });
        }
    }
}]);
app.controller('CadastroUsuarioController', function($scope) {

});