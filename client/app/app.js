angular.module('hackerHelpr', 
  ['Answers',
   'Search',
   'ui.router',
   'ngSanitize'])
.directive('header', function() {
  return {
    restrict: 'E',
    template: '<h1><a class="header" href="#/search">HackerHelpr</a></h1>'+
              '<span><h4>A better way to search StackOverflow</h4></span>'
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