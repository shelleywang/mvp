var answers = angular.module('Answers', []);

answers.controller('AnswersCtrl', function($scope, $http, $filter, $stateParams) {
  $scope.query = $stateParams.search;
  $scope.results = [];

  $scope.orderingBy = 'views';

  $scope.populate = function() {
    $http({
      method: 'GET',
      url: '/api/search/'+$scope.query,
    })
    .then(function (resp) {
      $scope.results = resp.data;
    });
  };

  $scope.populate();

  var orderBy = $filter('orderBy');

  $scope.order = function(predicate, reverse) {
    $scope.results = $filter('orderBy')($scope.results, predicate, true);
    $scope.orderingBy = predicate;
  };


});