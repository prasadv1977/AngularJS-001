

(function (){
  
  var app = angular.module("githubviewer");
  
  var gitHub = function ($http, $log) {
    
    var getUser = function (username) {
      $log.info ("https://api.github.com/users/" + username);
      return $http.get("https://api.github.com/users/" + username)
                    .then(function(response) {
                      $log.info (response.data);
                      return response.data;
                    });
    };
    
    var getRepos = function (user) {
      $log.info (user.repos_url);
      return $http.get(user.repos_url)
                    .then(function(response) {
                      $log.info (response.data);
                      return response.data;
                    });
    };
    
    var getRepoDetails = function (username, reponame) {
      var repo;
      var repoUrl = "https://api.github.com/repos/" + username + "/" + reponame;
      
       return $http.get(repoUrl)
                    .then(function(response) {
                      repo = response.data;
                      return $http.get(repoUrl + "/contributors");
                    });
                    .then(function(response) {
                      repo.contributors = response.data;
                      return repo;
                    });
    };
    
    return {
      getUser: getUser,
      getRepos: getRepos,
      getRepoDetails : getRepoDetails
    } 
  };
  
  app.factory("gitHub",gitHub);
}());