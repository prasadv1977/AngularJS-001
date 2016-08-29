
(function() {
  
  var app = angular.module("githubviewer",[]);
  
  var MainCtrl = function($scope) {
    var person = {
      firstName: "Vidya",
      lastName: "Sekhar"
    }
    $scope.message = "Hello, Angular!";
    $scope.person = person;
  };
  
  app.controller("MainController", MainCtrl);
}());