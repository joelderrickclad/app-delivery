angular.module('EDT', ['ngRoute', 'eventSummaryModule']).
config(['$routeProvider', '$httpProvider',
    function ($routeProvider, $httpProvider)
    {
        $routeProvider.otherwise({redirectTo: '/eventSummary'});
    }
]
);