(function () {
    'use strict';
    var Core_Routes = function ($stateProvider, $locationProvider, $urlRouterProvider, urlConfig) {
        $locationProvider.html5Mode(true);
        $urlRouterProvider.otherwise($urlRouterProvider.otherwise("/home"));

        $stateProvider
                .state('home', {
                    url: "",
                    abstract: true,
                    views: {
                        'header': {
                            templateUrl: '/ResumeApp/app/components/header/header.html',
                            controller: 'Header_Ctrl',
                            controllerAs: 'vm'
                        }
                    }
                }).state('home.resume', {
            url: "/resume",
            views: {
                'header': {
                    templateUrl: '/ResumeApp/app/components/header/header.html',
                    controller: 'Header_Ctrl',
                    controllerAs: 'vm'
                }
            }
        });
    };
    angular.module('coreModule').config(Core_Routes);
})();
