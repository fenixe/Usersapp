(function () {
    /* Content panel*/
    var app = angular.module('HomePageController', []);



    app.directive('homePage', function () {
        return {
            restrict: 'E',
            templateUrl: './view/home-page.html',
            controller: function ($scope, $rootScope, getUsers) {
                // create the list of users
                getUsers.async().then(function(d) {
                    $scope.users = d;
                });

                //$scope.sortType = 'creationDate'; // set the default sort type
                //$scope.sortReverse = false;  // set the default sort order
                //$scope.searchFish = '';     // set the default search/filter term

                console.log($scope);
                /*this.tab = 'today';

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
            controllerAs: 'homePageCtrl'
        };
    });
})();