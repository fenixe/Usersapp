(function () {
    /* Contact panel*/
    var app = angular.module('ContactController', []);

    // Directive phone input field
    app.directive('phoneInput', function ($filter, $browser) {
        return {
            require: 'ngModel',
            link: function ($scope, $element, $attrs, ngModelCtrl) {

                // Create listeners object
                var listener = function () {
                    var value = $element.val().replace(/[^0-9]/g, '');
                    value = $filter('telephone')(value);

                    $scope.phone.phoneNumber = value;
                    $element.val(value);
                };

                // This runs when we update the text field
                ngModelCtrl.$parsers.push(function (viewValue) {
                    return viewValue.replace(/[^0-9]/g, '').slice(0, 10);
                });

                // This runs when the model gets updated on the scope directly and keeps our view in sync
                ngModelCtrl.$render = function () {
                    $element.val($filter('telephone')(ngModelCtrl.$viewValue));
                };

                $element.bind('change', listener);
                $element.bind('keydown', function (event) {
                    var key = event.keyCode;
                    // If the keys include the CTRL, SHIFT, ALT, or META keys, or the arrow keys, do nothing.
                    // This lets us support copy and paste too
                    if (key == 91 || (15 < key && key < 19) || (37 <= key && key <= 40)) {
                        return;
                    }
                    $browser.defer(listener); // Have to do this or changes don't get picked up properly
                });

                $element.bind('paste cut', function () {
                    $browser.defer(listener);
                });
            }

        };
    });

    // Angular filter for phone's field
    app.filter('telephone', function () {
        return function (number) {
            /**
             * @param {Number | String} number - Number that will be formatted as telephone number
             * Returns formatted number: (###) ###-####
             * if number.length < 4: ###
             * else if number.length < 7: (###) ###
             */

            if (!number) {
                return '';
            }

            number = String(number);

            // Will return formattedNumber.
            // If phonenumber isn't longer than an area code, just show number
            var formattedNumber = number;

            // # (###) ###-#### as c (area) front-end
            var area = number.substring(0, 3);
            var front = number.substring(3, 6);
            var end = number.substring(6, 10);

            if (front) {
                formattedNumber =  "(" + area + ") " + front;
            }
            if (end) {
                formattedNumber += ("-" + end);
            }
            return formattedNumber;
        }
    });

    // Directive for Users`s contact form
    app.directive('contactForm', function () {
        return {
            restrict: 'E',
            templateUrl: './view/contact-form.html',

            controller: function ($rootScope, $scope, getUsers, $http, $routeParams) {
                var userFirstName,
                    userLastName;

                function getUserById(users, id) {
                    var user = users.filter(function (user, idx, arr) {
                        return user._id === id;
                    });
                    return user[0];
                }

                // Get user info by _id. Take data from users.json and filter it by id
                getUsers.async().then(function (data) {
                    $scope.user = getUserById(data, +$routeParams.id);
                    userFirstName = $scope.user.firstname;
                    userLastName = $scope.user.lastname;
                });

                // Return full name for contact sidebar
                $scope.getFullName = function () {
                    return userFirstName + " " + userLastName;
                };

                // This send user data if form valid
                $scope.signUpForm = function () {
                    $http({
                        method: 'POST',
                        url: './api/contacts/' + $routeParams.id,
                        data: $scope.user
                    }).success(function (data, status, headers, cfg) {
                        alertify.log('User data saved successfully', 'success', 2000);
                    }).error(function (data, status, headers, cfg) {
                        alertify.log('An error occurred when saving data', 'error', 2000);
                    });
                };
            },

            controllerAs: 'contactFormCtrl'
        };
    });
})();