'use strict';

/* Controllers */
angular.module('tvPirateApp.controllers', ['angular-underscore']);
var SearchCtrl = ['$scope', '$timeout', 'Shows', 'Episodes', 'PB',
    function($scope, $timeout, Shows, Episodes, PB) {
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
                var episodes = _.filter(res.Episode, function(episode){
                   return _.has(episode, 'EpisodeName') && episode.SeasonNumber > 0;
                });
                episodes = _.sortBy(episodes, function(episode){
                    return [episode.SeasonNumber, episode.EpisodeNumber].join("_");
                }).reverse();
                $scope.Episodes =  _.map(episodes, function(episode){
                        episode.SeasonNumber = 'S0'+episode.SeasonNumber;
                        episode.magnet = 'img/loading.gif';
                        episode.SeriesName = show.SeriesName;
                        return episode;
                    });
                $scope.title = 'Available Episodes:';
            });
        }

        $scope.getPB = function(episode){
            episode.pbActive = true;
            PB.get({'keyword': episode.SeriesName + ' ' + episode.EpisodeName},
                function success(res){
                    debugger
                    if (res && res.results && res.results.length > 0) {
                        episode.pb = res.results[0].magnetlink;
                        episode.magnet = 'img/icon-magnet.gif';
                    } else {
                        episode.pbActive = false;
                    }
                }
            )
        }

    }
];