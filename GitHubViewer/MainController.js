
(function() {
  
  var app = angular.module("githubviewer");
  
  var mainController = function($scope, $interval, $location) {
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
    
     $scope.search = function (username) {
      if (countdownInterval) {
        $interval.cancel(countdownInterval);
        $scope.countdown = null;
      }
      // redirect to the user controller after the search is complete
      $location.path("/user/" + username);
    }
    
    $scope.username = "angular";
    $scope.countdown = 5;
    startCountdown();
  };
  
  app.controller("mainController", mainController);
}());