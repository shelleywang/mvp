var answers = angular.module('Answers', []);

answers.controller('AnswersCtrl', function($scope, $http) {
  $scope.test = {};

  $scope.populate = function() {
    $http.get('test/sample.json').success(function(data) {
      $scope.test = data.items;
    })
  };

  $scope.populate();
});