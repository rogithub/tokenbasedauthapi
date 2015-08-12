(function() {
    var app = angular.module("app");
    
    app.factory("apiFactory", ['$http', '$location', 'tokenStorage', 'errorHandler', 
                               function($http, $location, tokenStorage, errorHandler) {
                        
        var Api = function (url) {
            this.url = url;            
        };
        
        Api.prototype.call = function(success) {            
            var api = this;
            $http({
                url: api.url + "date",
                method: "GET",
                headers: { 'x-access-token': tokenStorage.getAccessHeader() },
            }).success(success).error(errorHandler);
        };                               
                        
        return function(url) { 
            return new Api(url);
        };
        
    }]);
    
})();

(function() {
    var app = angular.module("app");
    
    app.factory("api", ['apiFactory', function(apiFactory) {   
        var api = apiFactory('http://localhost:3001/api/');
        return api;
    }]);
    
})();