angular.module('hackerHelpr', 
  ['Answers',
   'Search',
   'ngRoute'])
.config(function($routeProvider) {
  $routeProvider
  .when('/search', {
    templateUrl: 'app/search/search.html',
    controller: 'SearchCtrl'
  })
  .when('/results', {
    templateUrl: 'app/answers/answers.html',
    controller: 'AnswersCtrl'
  })
  .otherwise({
    redirectTo: '/search'
  })
})