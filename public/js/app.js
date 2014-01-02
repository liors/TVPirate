'use strict';

var app = angular.module('tvPirateApp', [
    'tvPirateApp.services',
    'tvPirateApp.directives',
    'tvPirateApp.controllers'
]);

app.config(function($compileProvider, $routeProvider) {
    $compileProvider.urlSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|javascript|magnet):/);

    $routeProvider
        .when('/',
        {
            templateUrl: "app.html",
            controller: "SearchCtrl"
        })
        .when('/pizza', {
            template: "Yum!!"
        }).otherwise({
            template: "This doesn't exist!"
        })
});