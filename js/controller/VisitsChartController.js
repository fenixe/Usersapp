(function () {
    /* Visits Chart panel*/
    var app = angular.module('VisitsChartController', []);

    app.directive('visitsChart', function () {
        return {
            restrict: 'E',
            templateUrl: './view/visits-chart.html',
            controller: function ($scope, $rootScope, getUsersCharts, $routeParams) {
                getUsersCharts.async($routeParams.id).then(function (data) {
                    setChartOptions(data)
                });

                function setChartOptions(data) {

                    $scope.chartOptions = {
                        title: {
                            text: 'User visits'
                        },
                        credits: {
                            enabled: false
                        },
                        tooltip: {
                            backgroundColor: null,
                            borderWidth: 0,
                            shadow: false,
                            useHTML: true,
                            style: {
                                padding: 0
                            }
                        },
                        xAxis: {
                            categories: ['1 Jan', '2 Jan', '3 Jan', '4 Jan', '5 Jan']
                        },
                        options: {
                            labels: {
                                items: [{
                                    html: 'Online VS Offline',
                                    style: {
                                        left: '105px',
                                        top: '18px',
                                        color: (Highcharts.theme && Highcharts.theme.textColor) || 'black'
                                    }
                                }]
                            }
                        },
                        series: [{
                            type: 'spline',
                            name: "Pages per visits",
                            data: [2.9, 30, 10.4, 32.2, 0],
                            marker: {
                                lineWidth: 2,
                                lineColor: Highcharts.getOptions().colors[3], // Graphick`s picks
                                fillColor: 'white'
                            }
                        }, {
                            type: 'pie',
                            name: 'Online VS Offline',
                            data: [{
                                name: 'Online',
                                y: data.views.online,
                                color: Highcharts.getOptions().colors[0] // Online's color
                            }, {
                                name: 'Offline',
                                y: data.views.offline,
                                color: Highcharts.getOptions().colors[1] // Offline's color
                            }],
                            center: [80, 80],
                            size: 100,
                            showInLegend: false,
                            dataLabels: {
                                enabled: false
                            }
                        }]
                    };
                }
            },
            controllerAs: 'visitsChartCtrl'
        };
    });
})();