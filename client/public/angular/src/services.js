(function() {
    var app = angular.module("app");
    
    app.factory("apiFactory", ['$http', function($http) {
        
        var Api = function (url){
            this.url = url;
        }
        
        Api.prototype.error = function(data, status, headers, config, statusText) {
            if (status >= 400 && status < 500){
                $location.path('/login');
            }
            console.error('%s %s %s', config.method, config.url, status);
        }
        
        Api.prototype.call = function(success) {
            var api = this;
            var promise = $http.get(api.url + "date");
            promise.success(success);
            promise.error(api.error);
        }
                        
        Api.prototype.login = function(model, success) {           
            var api = this;
            $http({
                url: api.url + "login",
                method: "POST",
                data: model,
            }).success(success).error(api.error);
        }
                        
        return function(url) { 
            return new Api(url);
        }
        
    }]);
    
})();

(function() {
    var app = angular.module("app");
    
    app.factory("api", ['apiFactory', function(apiFactory) {   
        var api = apiFactory('http://localhost:3000/api/');
        return api;
    }]);
    
})();