var answers = angular.module('Answers', []);

answers.controller('AnswersCtrl', function($scope, $http, $filter) {
  $scope.results = [];

  $scope.orderingBy = 'views';

  $scope.populate = function() {
    // $http.get('test/sample.json').success(function(data) {
    //   $scope.test = data.items;
    // })
    $http({
      method: 'GET',
      url: '/api/search',
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