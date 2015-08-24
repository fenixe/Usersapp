(function () {
    /* Main app controller*/
    var app = angular.module('AppController', []);

    app.controller('AppController', function (localStorageService,$scope, $rootScope, AuthService,ContentService, COOKIE , $http) {
        $scope.isAuthorized = AuthService.isAuthorized;
        $scope.logout = AuthService.logout;
        $rootScope.loginUser = (($scope.isAuthorized())? localStorageService.get(COOKIE.userID) : null);
        $scope.loader = function(){
            return $rootScope.promise;
        };
    });
})();


