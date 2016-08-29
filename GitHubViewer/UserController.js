
(function (){
  
  var app = angular.module("githubviewer");
  
  var userController = function($scope, gitHub, $log, $routeParams) {
  
    var onUserComplete = function (data) {
      $scope.user = data;
      gitHub.getRepos($scope.user)
        .then(onRepos, onError);
    }
  
    var onRepos = function (data) {
      $scope.repos = data;
    }
  
    var onError = function (reason) {
      $scope.error = "could not fetch data";
    }
    
    $scope.username = $routeParams.username;
    $scope.countdown = 5;
    $scope.repoSortOrder = "-stargazers_count";
    $log.info($routeParams.username);
    gitHub.getUser($routeParams.username).then(onUserComplete,onError);
  };
  
  app.controller("userController", userController);
}());