var app = angular.module('myApp',[]);
app.run(function($rootScope) {
    $rootScope.rootProperty = 'root scope';
});

app.controller('ParentController',function($scope) {
    $scope.parentProperty = 'parent scope';
});

app.controller('ChildController',function($scope) {
    $scope.childProperty = 'child scope';
    $scope.fullSentenceFromChild = 'Same $scope: We can acess : ' +
        $scope.rootProperty + ' and ' +
        $scope.parentProperty + ' and ' +
        $scope.childProperty;
});