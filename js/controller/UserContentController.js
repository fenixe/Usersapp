(function () {
    /* Navigate panel*/
    var app = angular.module('UserContentController', []);

    app.controller('userContentCtrl', function($scope){
        console.log($scope);

        /*var me = this;
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
         $scope.contentCtrl.changeTab($scope.contentCtrl.tab);
         });
         };*/
    });

    app.directive('userContent', function () {
        return {
            restrict: 'E',
            templateUrl: './view/user-content.html'
        };
    });
})();