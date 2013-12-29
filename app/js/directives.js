'use strict';

/* Directives */
var directives = angular.module('tvPirateApp.directives', []);
directives.directive('episodes', function() {
    return {
        restrict: 'E',
        templateUrl: 'episodes.html',
        link: function(scope) {
            debugger
        }
    }
  });
