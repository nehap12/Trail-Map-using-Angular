/**
 * Created by NehaP on 3/31/2017.
 */

var app = angular.module('myApp', ['ngRoute']);

app.config(function($routeProvider,$locationProvider) {

    $routeProvider
        .when('/', {
            templateUrl : './views/mapInfo.html',
            controller: 'MapInfoController'
        })
});




