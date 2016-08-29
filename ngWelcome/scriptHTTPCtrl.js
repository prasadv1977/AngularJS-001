
(function (){
  
  var app = angular.module("githubviewer");
  
  var httpController = function($scope, $http, $interval) {
  
    var onUserComplete = function (response) {
      $scope.user = response.data;
      $http.get($scope.user.repos_url)
        .then(onRepos, onError);
    }
  
    var onRepos = function (response) {
      $scope.repos = response.data;
    }
  
    var onError = function (reason) {
      $scope.error = "could not fetch data";
    }
    
    $scope.search = function (username) {
      
      $http.get ("https://api.github.com/users/" + username)
        .then(onUserComplete, onError);
    }
    
    var decrementCountdown = function() {
      $scope.countdown -= 1;
      if ($scope.countdown < 1) {
        $scope.search($scope.username);
      }
    }
    
    var startCountdown = function () {
      $interval(decrementCountdown, 1000, 5);
    }
    
    $scope.username = "angular";
    $scope.countdown = 5;
    startCountdown();
  };
  
  app.controller("httpController", httpController);
}());