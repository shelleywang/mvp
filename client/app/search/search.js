var search = angular.module('Search', []);

search.controller('SearchCtrl', function($scope, $http, $location) {
  $scope.searchTerms = '';

  $scope.redirect = function() {
    $location.path('/results/'+$scope.searchTerms);
  };
});