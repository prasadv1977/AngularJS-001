
(function (){
  
  var app = angular.module("githubviewer");
  
  var httpController = function($scope, $http, $interval, $log, $anchorScroll, $location) {
  
    var onUserComplete = function (response) {
      $scope.user = response.data;
      $http.get($scope.user.repos_url)
        .then(onRepos, onError);
    }
  
    var onRepos = function (response) {
      $scope.repos = response.data;
      $location.hash("userdetails");
      $anchorScroll();
    }
  
    var onError = function (reason) {
      $scope.error = "could not fetch data";
    }
    
    $scope.search = function (username) {
      $log.info("Searching for " + username);
      $http.get ("https://api.github.com/users/" + username)
        .then(onUserComplete, onError);
      if (countdownInterval) {
        $interval.cancel(countdownInterval);
        $scope.countdown = null;
      }
    }
    
    var decrementCountdown = function() {
      $scope.countdown -= 1;
      if ($scope.countdown < 1) {
        $scope.search($scope.username);
      }
    }
    
    var countdownInterval = null;
    var startCountdown = function () {
      countdownInterval = $interval(decrementCountdown, 1000, 5);
    }
    
    $scope.username = "angular";
    $scope.countdown = 5;
    $scope.repoSortOrder = "-stargazers_count";
    startCountdown();
  };
  
  app.controller("httpController", httpController);
}());