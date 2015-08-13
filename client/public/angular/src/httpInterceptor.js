(function() {
    var app = angular.module("app");
    
    app.factory("httpInterceptor", ['$q', '$location', 'tokenStorage', function($q, $location, tokenStorage) {

        var freeAccesPages = ['/login'];
        
        return {
            
            // optional method
            'request': function(request) {    
            
                // if is not listed in the freeAccessPages array
                if (freeAccesPages.indexOf($location.path()) === -1) {
                    var tokenObj = tokenStorage.getToken();

                    if (tokenObj === undefined)
                        $location.url('/login');
                }
                
                //set 'x-access-token' header
                request.headers['x-access-token'] = tokenStorage.getAccessHeader();
                
                return request;
            },

            // optional method
            'requestError': function(rejection) {
                return $q.reject(rejection);
            },

            // optional method
            'response': function(response) {
                // do something on success
                return response;
            },

            // optional method
            'responseError': function(rejection) {
                if (rejection.status === 401) {
                    $location.url('/login');
                }
                
                return $q.reject(rejection);
            }
        };
        
    }]);
    
})();
