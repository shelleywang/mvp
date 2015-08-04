angular.module('hackerHelpr', 
  ['Answers',
   'Search',
   'ui.router'])
.directive('header', function() {
  return {
    restrict: 'E',
    template: '<h1><a class="header" href="#/search">HackerHelpr</a></h1>'
  };
})
.config(function($stateProvider,$urlRouterProvider) {
  $urlRouterProvider.otherwise('/search');

  $stateProvider
  .state('/search', {
    url: '/search',
    templateUrl: 'app/search/search.html',
    controller: 'SearchCtrl'
  })
  .state('/results', {
    url: '/results/:search',
    views: {
      'searchBar' : {
        templateUrl: 'app/search/search.html',
        controller: 'SearchCtrl'},
      'resultsDiv' : {
        templateUrl: 'app/answers/answers.html',
        controller: 'AnswersCtrl'}
    }
  })
})