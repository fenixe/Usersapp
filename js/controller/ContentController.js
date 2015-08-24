(function () {
    /* Content panel*/
    var app = angular.module('ContentController', []);

    app.filter('capitalize', function () {
        return function (input) {
            return (!!input) ? input.replace(/([^\W_]+[^\s-]*) */g, function (txt) {
                return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
            }) : '';
        }
    });

    app.service('ContentService', function ($http, $filter, $rootScope) {
        return {
            getHoroscope: function (zodiac, dates) {
                return $rootScope.promise = $http.post('./content/parse-content.php', {zodiac: zodiac, dates: dates});
            },
            getZodiac: function (date) {
                var zodiacs = {
                    0: {limit: 21, vals: ["aquarius", "capricorn"]},
                    1: {limit: 20, vals: ["pisces", "aquarius"]},
                    2: {limit: 21, vals: ["aries", "pisces"]},
                    3: {limit: 21, vals: ["taurus", "aries"]},
                    4: {limit: 21, vals: ["gemini", "taurus"]},
                    5: {limit: 21, vals: ["cancer", "gemini"]},
                    6: {limit: 22, vals: ["leo", "cancer"]},
                    7: {limit: 22, vals: ["virgo", "leo"]},
                    8: {limit: 22, vals: ["libra", "virgo"]},
                    9: {limit: 22, vals: ["scorpio", "libra"]},
                    10: {limit: 23, vals: ["sagittarius", "scorpio"]},
                    11: {limit: 22, vals: ["capricorn", "sagittarius"]}
                };
                var dt = new Date(date);
                var zodObj = zodiacs[dt.getMonth()];
                return dt.getDate() >= zodObj.limit ? zodObj.vals[0] : zodObj.vals[1];
            }
        };
    });

    app.directive('contentPanel', function (ContentService, localStorageService, HOROSCOPES) {
        return {
            restrict: 'E',
            templateUrl: './view/content-panel.html',
            controller: function ($scope, $rootScope) {
                this.tab = 'today';

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
                };
            },
            controllerAs: 'contCtrl'
        };
    });
})();