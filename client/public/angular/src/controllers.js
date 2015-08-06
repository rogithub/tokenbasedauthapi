(function() {
    var app = angular.module('app');
    
    app.controller('IndexController', ['$location', 'api', function($location, api) {  
       
        var model = this;        
        
        model.callApi = function() {
            api.call(function(data) {
                model.students = data;
            });
        };        
        
    }]);
})();

(function() {
    var app = angular.module('app');
    
    app.controller('LoginController', ['$location', '$http', function($location, $http) {  
       
        var model = this;
        model.username = '';
        model.password = '';
        
        
        model.login = function() {
            
        };        
        
    }]);
})();