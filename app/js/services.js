'use strict';

/* Services */
var services = angular.module('tvPirateApp.services', ['ngResource']);

services.factory('Shows', ['$http', '$resource', function($http, $resource){
    return $resource('/show?keyword=:show');
}]);

services.factory('Episodes', ['$http', '$resource', function($http, $resource){
    return $resource('/episodes');
}]);

services.factory('PB', ['$http', '$resource', function($http, $resource){
    return $resource('/pb');
}]);