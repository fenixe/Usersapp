/* Content panel*/
var app = angular.module('UsersTableController', []);

app.directive('usersTable', function () {
    return {
        restrict: 'E',
        replace: true,
        scope: true,
        templateUrl: './view/users-table.html',
        controller: function (getUsers, $scope, $rootScope, $location) {
            // get the list of users
            getUsers.async().then(function (d) {
                $scope.users = d;
            });

            $scope.filter = {};

            $scope.sortColumn = $rootScope.sortColumn;             // value for sort column
            $scope.sortReverse = $rootScope.sortReverse || false;  // value for sort ASC or DESC
            $scope.searchSite = $rootScope.searchSite;             // value for sorting by site name

            // Get array with unique site name
            $scope.getSites = function () {
                return ($scope.users || []).map(function (w) {
                    return w.site;
                }).filter(function (w, idx, arr) {
                    return arr.indexOf(w) === idx;
                });
            };

            // Controller for filter by site name
            $scope.filterBySite = function (users) {
                return $scope.filter[users.site] || noFilter($scope.filter);
            };

            function noFilter(filterObj) {
                for (var key in filterObj) {
                    if (filterObj[key]) {
                        return false;
                    }
                }
                return true;
            }

            // Sort controller for table
            $scope.sortBy = function (field) {
                if ($scope.sortColumn == field) {
                    $rootScope.sortReverse = !$rootScope.sortReverse;
                } else {
                    $rootScope.sortColumn = field;
                    $rootScope.reverse = false;
                }
            };

            // Controller for redirect on users contact content
            $scope.showUser = function (id) {
                var path = $location.path();
                $location.path(path + '/' + id);
            };

        },
        controllerAs: 'usersTablesCtrl'
    };
});

