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

            $scope.sortColumn = $rootScope.sortColumn; // значение сортировки по умолчанию
            $scope.sortReverse = $rootScope.sortReverse || false;  // обратная сортировка
            $scope.searchSite = $rootScope.searchSite;     // значение поиска по умолчанию*/

            $scope.getSites = function () {
                return ($scope.users || []).map(function (w) {
                    return w.site;
                }).filter(function (w, idx, arr) {
                    return arr.indexOf(w) === idx;
                });
            };

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

            $scope.sortBy = function (field) {
                if ($scope.sortColumn == field) {
                    $rootScope.sortReverse = !$rootScope.sortReverse;
                } else {
                    $rootScope.sortColumn = field;
                    $rootScope.reverse = false;
                }
            };

            $scope.showUser = function (id) {
                var path = $location.path();
                $location.path(path + '/' + id);
            };

            /* this.tab = 'today';


             var curUser = localStorageService.get(this.tab);
             $scope.curUser = curUser || [];

             this.changeTab = function (nameTab) {
             var ls =  localStorageService.get(nameTab);
             $scope.curUser.horoscope = ls.horoscope;
             $scope.curUser.zodiac = ls.zodiac;
             this.tab = nameTab;
             };
             this.isLoginUser = function(){
             return $scope.curUser.zodiac !== $rootScope.loginUser.zodiac
             };
             this.setLoginUser = function(){
             ContentService.getHoroscope($rootScope.loginUser.zodiac, HOROSCOPES).then(function (res) {
             angular.forEach(res.data, function (value, key) {
             localStorageService.set(value.date, value);
             });
             $scope.curUser = $rootScope.loginUser;
             $scope.contCtrl.changeTab($scope.contCtrl.tab);
             });
             };
             this.isSet = function (checkTab) {
             return this.tab === checkTab;
             };*/
        },
        controllerAs: 'usersTablesCtrl'
    };
});

