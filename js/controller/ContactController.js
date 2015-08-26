(function () {
    /* Contact panel*/
    var app = angular.module('ContactController', []);

   /* app.directive('numbersOnly', function () {
        return {
            require: 'ngModel',
            link: function (scope, element, attrs, modelCtrl) {
                console.log(attrs.numbersOnly);

                modelCtrl.$parsers.push(function (inputValue) {
                    console.log(scope.user.phoneNumbers.phoneNumber);
                    // this next if is necessary for when using ng-required on your input.
                    // In such cases, when a letter is typed first, this parser will be called
                    // again, and the 2nd time, the value will be undefined
                    if (inputValue == undefined) return '';
                    var transformedInput = inputValue.replace(/[^0-9]/g, '');
                    if (transformedInput != inputValue) {
                        modelCtrl.$setViewValue(transformedInput);
                        modelCtrl.$render();
                    }

                    return transformedInput;
                });
            }
        };
    });*/

    app.directive('contactForm', function () {
        return {
            restrict: 'E',
            templateUrl: './view/contact-form.html',
            require: '?ngModel',

            link: function (scope, element, attrs, ngModel) {

                if (!ngModel) return;

                ngModel.$parsers.push(function (inputValue) {
                    console.log(ngModel);
                    // this next if is necessary for when using ng-required on your input.
                    // In such cases, when a letter is typed first, this parser will be called
                    // again, and the 2nd time, the value will be undefined
                    if (inputValue == undefined) return '';
                    var transformedInput = inputValue.replace(/[^0-9]/g, '');
                    if (transformedInput != inputValue) {
                        ngModel.$setViewValue(transformedInput);
                        //modelCtrl.$render();
                    }

                    return transformedInput;
                });

                ngModel.$parsers.unshift(function (inputValue) {
                    var digits = inputValue.split('').filter(function (s) {
                        return (!isNaN(s) && s != ' ');
                    }).join('');
                    ngModel.$viewValue = digits;
                    ngModel.$render();
                    return digits;
                });
            },

            controller: function ($rootScope, $scope, getUsers, $http, $routeParams, $filter) {
                var userFirstName,
                    userLastName;
                getUsers.async().then(function (data) {
                    $scope.user = getUserById(data, +$routeParams.id);
                    userFirstName = $scope.user.firstname;
                    userLastName = $scope.user.lastname;
                });


                $scope.getName = function () {
                    return userFirstName + " " + userLastName;
                };

                $scope.phoneNumber = function (type) {
                    //console.log($scope);
                    //$scope.user.phoneNumbers.phoneNumber = "4545345";
                    return "dghgfhdhgh";
                };

                $scope.convertToArray = function (type) {
                    console.log(arguments);
                    //$scope.user.phoneNumbers.phoneNumber = "4545345";
                    return "dghgfhdhgh";
                };

                /*$filter('phonenumber', function() {
                 /!*
                 Format phonenumber as: c (xxx) xxx-xxxx
                 or as close as possible if phonenumber length is not 10
                 if c is not '1' (country code not USA), does not use country code
                 *!/

                 return function (number) {
                 /!*
                 @param {Number | String} number - Number that will be formatted as telephone number
                 Returns formatted number: (###) ###-####
                 if number.length < 4: ###
                 else if number.length < 7: (###) ###

                 Does not handle country codes that are not '1' (USA)
                 *!/
                 if (!number) {
                 return '';
                 }

                 number = String(number);

                 // Will return formattedNumber.
                 // If phonenumber isn't longer than an area code, just show number
                 var formattedNumber = number;

                 // if the first character is '1', strip it out and add it back
                 var c = (number[0] == '1') ? '1 ' : '';
                 number = number[0] == '1' ? number.slice(1) : number;

                 // # (###) ###-#### as c (area) front-end
                 var area = number.substring(0, 3);
                 var front = number.substring(3, 6);
                 var end = number.substring(6, 10);

                 if (front) {
                 formattedNumber = (c + "(" + area + ") " + front);
                 }
                 if (end) {
                 formattedNumber += ("-" + end);
                 }
                 return formattedNumber;
                 };
                 });*/

                function getUserById(users, id) {
                    var user = users.filter(function (user, idx, arr) {
                        return user._id === id;
                    });
                    return user[0];
                }

                $scope.signUpForm = function () {
                    $http({
                        method: 'POST',
                        url: 'api/contacts/' + $routeParams.id,
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