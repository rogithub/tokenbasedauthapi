(function() {
    var app = angular.module('app');
    
    app.controller('IndexController', ['$location', 'api', function($location, api) {  
       
        var model = this;      
        model.data = undefined;
        
        model.callApi = function() {
            api.call(function(date) {
                model.data = date;
            });
        };        
        
    }]);
})();

(function() {
    var app = angular.module('app');
    
    app.controller('LoginController', ['$location', 'api', function($location, api) {  
       
        var model = this;
        model.username = '';
        model.password = '';
        
        
        model.login = function() {
            api.login({ username: model.username, password: model.password }, function(token) {
                window.localStorage.setItem('token', token);
                $location.path('/');
            });
        };        
        
    }]);
})();