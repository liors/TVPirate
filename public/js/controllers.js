'use strict';

/* Controllers */
angular.module('tvPirateApp.controllers', ['angular-underscore']);
var SearchCtrl = ['$scope', '$location', 'Shows', 'Episodes', 'PB','DataService',
    function($scope, $location, Shows, Episodes, PB, DataService) {
        $scope.init = function(){

        }

        $scope.search = function(){
            $scope.clear();
            Shows.get({'show': $scope.keyword}, function success(res){
                if(_.isArray(res.Series)){
                    $scope.Series = res.Series;
                } else {
                    $scope.Series = [];
                    $scope.Series.push(res.Series);
                }

            });
        }

        $scope.addShow = function(show){
            DataService.addShow(show);
             $location.path('/shows');
        }

        $scope.clear = function(){
            $scope.Episodes = [];
            $scope.Series = [];
        }

    }
];

var ShowsCtrl = ['$scope', '$location', 'Shows', 'Episodes', 'PB', 'DataService',
    function($scope, $location, Shows, Episodes, PB, DataService) {
        $scope.Series = DataService.getShows();

        $scope.removeShow = function(show){
             DataService.removeShow(show);
            $scope.Series = DataService.getShows();
        }

        $scope.home = function(){
            $location.path('/');
        }
    }
];