'use strict';

/* Controllers */
angular.module('tvPirateApp.controllers', ['angular-underscore']);
var SearchCtrl = ['$scope', 'Shows', 'Episodes', 'PB',
    function($scope, Shows, Episodes, PB) {
        $scope.init = function(){

        }

        $scope.search = function(){
            Shows.get({'show': $scope.keyword}, function success(res){
                if(_.isArray(res.Series)){
                    $scope.Series = res.Series;
                } else {
                    $scope.Series = [];
                    $scope.Series.push(res.Series);
                }
            });
        }

        $scope.getEpisodes = function(show){
            Episodes.get({'show': show.id}, function success(res){
                $scope.Episodes = res.Episode;
                //console.log(res.Episode);
                //var episode = res.Episode[0];
                //PB.get({'episode': episode.EpisodeName});
            });
        }

    }
];