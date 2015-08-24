(function () {
    /* Navigate panel*/
    var app = angular.module('NavController', []);

    app.directive('navPanel', function () {
        return {
            restrict: 'E',
            templateUrl: './view/nav-panel.html',
            controller : function($rootScope, ContentService, $scope, HOROSCOPES, localStorageService){
                var me = this;
                this.friends = {};

                $rootScope.$watch('loginUser', function(user) {
                    if (user){
                        $scope.friends = user.friends;

                        angular.forEach($scope.friends, function (friend, key) {
                            friend.zodiac = me.getZodiac(friend.date);
                        });
                    }
                },true);

                this.getZodiac = function(date){
                    return ContentService.getZodiac(date);
                };
                this.changeUserHoroscope = function(zodiac){
                    ContentService.getHoroscope(zodiac, HOROSCOPES).then(function (res) {
                        angular.forEach(res.data, function (value, key) {
                            localStorageService.set(value.date, value);
                        });
                        $scope.contCtrl.changeTab($scope.contCtrl.tab);
                    });
                };
            },
            controllerAs: 'navCtrl'
        };
    });
})();