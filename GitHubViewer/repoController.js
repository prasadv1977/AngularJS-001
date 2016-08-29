
(function () {
  var app = angular.module("githubviewer");
  
  var repoController = function ($scope, $routeParams, gitHub) {
    var reponame = $routeParams.reponame;
    var username = $routeParams.username;
    
    var onRepo = function (data) {
      $scope.repo = data;
    };
    
    var onError = function (reason) {
      $scope.error = reason;
    };
    
    gitHub.getRepoDetails(username, reponame)
      .then(onRepo, onError);
  };
  
  app.controller("repoController", repoController);
}());