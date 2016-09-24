(function () {
    var Header_Ctrl = function ($scope, $state, $rootScope, Core_Service) {
        var vm = this;
        console.log(this)
        
    };    
    Header_Ctrl.$inject = ["$scope", '$state', '$rootScope', 'Core_Service'];
    angular.module('coreModule')
            .controller('Header_Ctrl', Header_Ctrl);
})();
