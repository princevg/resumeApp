(function () {
    var Page1_Ctrl = function ($scope, $state, $rootScope, Core_Service) {
        var vm = this;
        console.log("dsfdf")
    };    
    Page1_Ctrl.$inject = ["$scope", '$state', '$rootScope', 'Core_Service'];
    angular.module('coreModule')
            .controller('Page1_Ctrl', Page1_Ctrl);
})();


