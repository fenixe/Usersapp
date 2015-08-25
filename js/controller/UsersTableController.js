
    /* Content panel*/
    var app = angular.module('UsersTableController', []);

    app.directive('usersTable', function () {
        return {
            restrict: 'E',
            replace: true,
            scope: true,
            templateUrl: './view/users-table.html',
            controller: function (getUsers, $scope,$rootScope) {
                // get the list of users
                getUsers.async().then(function(d) {
                    $scope.users = d;
                });

                $scope.sortColumn = $rootScope.sortColumn; // значение сортировки по умолчанию
                $scope.sortReverse = $rootScope.sortReverse || false;  // обратная сортировка
                $scope.searchSite = $rootScope.searchSite;     // значение поиска по умолчанию*/

                //console.log($rootScope);
                //console.log($scope);

                $scope.setFilterSite = function(site) {
                    $scope.searchSite = site;
                };


                $scope.sortBy = function(field) {
                    if ($scope.sortColumn == field) {
                        $rootScope.sortReverse = !$rootScope.sortReverse;
                    } else {
                        $rootScope.sortColumn = field;
                        $rootScope.reverse = false;
                    }
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

