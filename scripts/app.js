var app = angular.module("myApp", ["ngRoute"]);
app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
    when('/dashboard', {
      templateUrl: 'dashboard.html',
      controller: 'dashboardCtrl'
    }).
    when('/newQuote', {
      templateUrl: '/quoteInfo.html',
      controller: 'newQuoteCtrl'
    }).when('/productEntry', {
      templateUrl: '/productEntry/productEntry.html',
      controller: 'productEntryCtrl'
    });
  }
]);
