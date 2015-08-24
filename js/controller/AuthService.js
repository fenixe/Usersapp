(function () {
    var app = angular.module('AuthService', []);

    app.service('AuthService', function ($http, $cookies, localStorageService, COOKIE) {
        return {
            login: function (loginData) {
                return $http
                    .post('./login/login.php', loginData)
                    .then(function (res) {
                        return res;
                    });
            },
            logout: function () {
                localStorageService.clearAll();
            },
            isAuthorized: function () {
                return !!localStorageService.get(COOKIE.userID);
            }
        };
    });
})();
