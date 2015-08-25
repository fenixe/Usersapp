(function () {
    /* Content panel*/
    var app = angular.module('SitesListController', []);

    app.directive('sitesList',  function () {
        return {
            restrict: 'E',
            templateUrl: './view/sites-list.html',
            controller: function (getUsers, $scope, $rootScope) {
                // get the list of users
                getUsers.async().then(function(d) {
                    $scope.users = d;
                });





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
            controllerAs: 'sitesListCtrl'
        };
    });
})();