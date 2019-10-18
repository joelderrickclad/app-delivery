angular.module('eventSummaryModule', ['ngRoute', 'ngStorage']).
config(['$routeProvider', function ($routeProvider) {

	$routeProvider.when('/eventSummary', {
		controller: 'eventSummaryController',
		templateUrl: '/app/View/eventSummary.html',
		controllerAs: 'vm'
	});
}

]);