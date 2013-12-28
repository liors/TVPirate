'use strict';

var app = angular.module('tvPirateApp', [
  'tvPirateApp.services',
  'tvPirateApp.directives',
  'tvPirateApp.controllers'
]);

app.config(function($compileProvider){
      $compileProvider.urlSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|javascript|magnet):/);
});