(function() {
    var app = angular.module("app");
    
    app.factory("apiFactory", ['$http', '$location', function($http, $location) {
                
                
        var Api = function (url) {
            this.url = url;
        }
        
        Api.prototype.getToken = function() {
            return window.localStorage.getItem('token');            
        }
        
        Api.prototype.error = function(data, status, headers, config, statusText) {
            if (status === 401){
                return $location.path('/login');
            }
            console.error('%s %s %s', config.method, config.url, status);
        }
        
        Api.prototype.call = function(success) {            
            var api = this;
            $http({
                url: api.url + "date",
                method: "GET",
                headers: { 'x-access-token': api.getToken() },
            }).success(success).error(api.error);
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
        var api = apiFactory('http://localhost:3001/api/');
        return api;
    }]);
    
})();