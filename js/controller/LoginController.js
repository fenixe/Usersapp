(function () {
    /* Login panel*/
    var app = angular.module('LoginController', []);

    app.directive('loginForm', function () {
        return {
            restrict: 'E',
            templateUrl: './view/login-form.html',
            controller: function ($rootScope, $scope, localStorageService, COOKIE, HOROSCOPES, AuthService, ContentService) {
                $scope.loginData = {
                    email: '',
                    date: ''
                };
                this.login = function (loginData) {
                    AuthService.login(loginData).then(function (res) {
                        var userData = res.data.user;
                        $rootScope.loginUser = userData;

                        var currentZodiac = ContentService.getZodiac(userData.date);
                        $rootScope.loginUser.zodiac = currentZodiac;

                        ContentService.getHoroscope(currentZodiac, HOROSCOPES).then(function (res) {
                            angular.forEach(res.data, function (value, key) {
                                localStorageService.set(value.date, value);
                            });
                            localStorageService.set(COOKIE.userID, $rootScope.loginUser);
                           $scope.contentCtrl.changeTab($scope.contentCtrl.tab);
                        });
                    }, function () {
                    });
                };
            },
            controllerAs: 'logCtrl'
        };
    });
})();