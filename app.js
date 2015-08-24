(function () {
    var app = angular.module('UsersApp', ['ngRoute', 'ngCookies', 'cgBusy', 'LocalStorageModule', 'AppController', 'AuthService', 'LoginController', 'ContentController','NavController']);

    app.constant('COOKIE', {
        userID: 'userID'
    });

    app.constant('HOROSCOPES', {
        yesterday: 'yesterday',
        tomorrow: 'tomorrow',
        today: 'free-daily'
    });

    app.config(function ($httpProvider) {
        $httpProvider.interceptors.push([
            '$injector',
            function ($injector) {
                return $injector.get('AuthInterceptor');
            }
        ]);
    });
    app.factory('AuthInterceptor', function ($rootScope, $q) {
        return {
            responseError: function (response) {
                if (response.status === 401) {
                    console.log("Error 401");
                }
                if (response.status === 403) {
                    console.log("Error 403");
                }
                if (response.status === 419 || response.status === 440) {
                    console.log("Error");
                }
                return $q.reject(response);
            }
        };
    });

    app.directive('formAutofillFix', function ($timeout) {
        return function (scope, element, attrs) {
            element.prop('method', 'post');
            if (attrs.ngSubmit) {
                $timeout(function () {
                    element
                        .unbind('submit')
                        .bind('submit', function (event) {
                            event.preventDefault();
                            element
                                .find('input, textarea, select')
                                .trigger('input')
                                .trigger('change')
                                .trigger('keydown');
                            scope.$apply(attrs.ngSubmit);
                        });
                });
            }
        };
    });
})();


