(function () {
    /* Visits Chart panel*/
    var app = angular.module('VisitsChartController', []);

    app.directive('visitsChart', function () {
        return {
            restrict: 'E',
            templateUrl: './view/visits-chart.html',
            controller: function ($scope, $rootScope, getUsersCharts, $routeParams, $filter) {

                // Get data for user`s charts
                getUsersCharts.async($routeParams.id).then(function (data) {
                    setChartOptions(data);
                });

                // Generate Highchart panel from user`s chart data and set it in element by id="visitsChart"
                function setChartOptions(userChartData) {
                    var offtarget = userChartData.views.offtarget,
                        online = userChartData.views.online,
                        offline = userChartData.views.offline,
                        xAxis = [],
                        values = [];

                    /** I am not sure that offtarget data come from sever in this format, but it give possibility
                        for build solid chart from server data
                     */
                    for (var i = 0; i < offtarget.length; i++) {
                        var date = $filter('date')(offtarget[i].date, "d MMM");
                        var value = +offtarget[i].value;

                        xAxis.push(date);
                        values.push(value);
                    }

                    var char = new Highcharts.Chart({
                        chart: {
                            renderTo: "visitsChart"
                        },
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
                            categories: xAxis
                        },
                        labels: {
                            items: [{
                                html: 'Online VS Offline',
                                style: {
                                    left: '50px',
                                    top: '18px',
                                    color: (Highcharts.theme && Highcharts.theme.textColor) || 'black'
                                }
                            }]
                        },
                        series: [{
                            type: 'spline',
                            name: "Pages per visits",
                            data: values,
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
                                y: online,
                                color: Highcharts.getOptions().colors[0] // Online's color
                            }, {
                                name: 'Offline',
                                y: offline,
                                color: Highcharts.getOptions().colors[1] // Offline's color
                            }],
                            center: [80, 80],
                            size: 100,
                            showInLegend: false,
                            dataLabels: {
                                enabled: false
                            }
                        }]
                    });
                    return char;
                }
            },
            controllerAs: 'visitsChartCtrl'
        };
    });
})();