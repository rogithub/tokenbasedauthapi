(function() {
    var app = angular.module("app");
    
    app.factory("apiFactory", ['$http', function($http) {
        
        var Api = function (url){
            this.url = url;
        }
        
        Api.prototype.error = function(data, status, headers, config, statusText) {
            console.error('%s %s %s', config.method, config.url, status);
        }
        
        Api.prototype.getAll = function(success) {
            var api = this;
            var promise = $http.get(api.url);
            promise.success(success);
            promise.error(api.error);
        }
        
        Api.prototype.getOne = function(id, success) {         
            var api = this;
            var promise = $http.get(api.url + id);
            promise.success(success);
            promise.error(api.error);
        }
        
        Api.prototype.delete = function(id, success) {
            var api = this;
            $http({
                url: api.url + id,
                method: "DELETE",
            }).success(success).error(api.error);
        }
        
        Api.prototype.save = function(model, success) {           
            var api = this;
            $http({
                url: api.url,
                method: "POST",
                data: model,
            }).success(success).error(api.error);
        }
        
        Api.prototype.update = function(model, success) {  
            var api = this;
            $http({
                url: api.url,
                method: "PUT",
                data: model,
            }).success(success).error(api.error);
        }
        
        return function(url) { 
            return new Api(url);
        }
        
    }]);
    
})();