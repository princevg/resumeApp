(function () {
    'use strict';
    var Core_Run = function ($rootScope, $stat) {       
        $rootScope.$on('$stateNotFound', function (event, unfoundState, fromState, fromParams) {

        });

        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {            
            
        });
        
        $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
              
        });
    };
    angular.module('coreModule')
            .run(Core_Run);
})();
