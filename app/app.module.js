(function () {
    'use strict';
    angular.module('app.common', []);
    angular.module('app.constants', []);
    window.app = angular.module('coreModule', [
        'ui.router',
        'ngAnimate',
        'ui.bootstrap',
        'app.constants'
    ]);
    window.app.config(['$locationProvider','KeepaliveProvider', 'IdleProvider', function ($locationProvider,KeepaliveProvider, IdleProvider) {
           
        }]);

})();
