(function() {
    var app = angular.module("app");
    
    app.factory("errorHandler", ['$window', '$location', function($window, $location) {
        return function(data, status, headers, config, statusText) {
            if (status === 401){
                return $location.path('/login');
            }
            console.error('%s %s %s', config.method, config.url, status);
        };
    }]);
    
})();

(function() {
    var app = angular.module("app");
    
    app.factory("tokenStorage", ['$window', function($window) {        
        return {        
            getToken: function() {
                var json = $window.localStorage.getItem('token');            
                if (json) return JSON.parse(json);

                return undefined;
            },

            setToken: function (data) {
                $window.localStorage.setItem('token', JSON.stringify(data));
            },

            clearToken: function () {
                $window.localStorage.setItem('token', '');
            },

            getAccessHeader: function() {
                var that = this;
                var token = that.getToken();
                if (token) {
                    return token.token;
                }
                return '';
            }
        };
    }]);
    
})();

