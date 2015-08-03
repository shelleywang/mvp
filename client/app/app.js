angular.module('hackerHelpr', 
  ['Answers',
   'Search',
   'ui.router'])
.config(function($stateProvider,$urlRouterProvider) {
  $urlRouterProvider.otherwise('/search');

  $stateProvider
  .state('/search', {
    url: '/search',
    templateUrl: 'app/search/search.html',
    controller: 'SearchCtrl'
  })
  .state('/results', {
    url: '/results',
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