(function () {
    var app = angular.module('usersApp', [
        'ngRoute',
        'highcharts-ng',
        'ContactSidebarController',
        'ContactController',
        'UsersTableController',
        'VisitsChartController'
    ]);

    // Set routers configuration
    app.config(['$routeProvider',
        function ($routeProvider) {
            $routeProvider.
                when('/api/contacts', {
                    templateUrl: 'view/home-page.html'
                }).
                when('/api/contacts/:id', {
                    templateUrl: 'view/user-content.html'
                }).
                when('api/contacts/:id/visits', {
                    templateUrl: 'view/phone-detail.html',
                    controller: 'PhoneDetailCtrl'
                }).
                otherwise({
                    redirectTo: '/api/contacts'
                });
        }
    ]);

    // Set request for get users data
    app.factory('getUsers', function ($http) {
        var promise;
        return {
            async: function () {
                if (!promise) {
                    // $http returns a promise, which has a then function, which also returns a promise
                    promise = $http.get('api/contacts/users.json').then(function (response) {
                        // The return value gets picked up by the then in the controller.
                        return response.data;
                    });
                }
                // Return the promise to the controller
                return promise;
            }
        };
    });

    // Set request for get user chart data
    app.factory('getUsersCharts', function ($http) {
        var promise;
        return {
            async: function (id) {
                promise = $http.get('api/contacts/'+ id +'/visits/visit.json').then(function (response) {
                    // The return value gets picked up by the then in the controller.
                    return response.data;
                });

                // Return the promise to the controller
                return promise;
            }
        };
    });

    // Set error handler
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
})();


