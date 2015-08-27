(function () {
    /* Content panel*/
    var app = angular.module('ContactSidebarController', []);

    app.directive('contactSidebar', function () {
        return {
            restrict: 'E',
            templateUrl: './view/contact-sidebar.html',
            controller: function () {
            },
            controllerAs: 'contactSidebarCtrl'
        };
    });
})();