(function () {
    var app = angular.module('app', ['ngRoute']);
    

    app.config(["$routeProvider", function ($router, $http) {        
        
        //setup token
        var token = window.localStorage.getItem('token');
        $http.defaults.headers.common['x-access-token'] = token;
        
        $router.when("/", { templateUrl: "angular/views/index.html" })
        .when("/login", { templateUrl: "angular/views/login.html" })
        
        
        .otherwise({ redirectTo: "/" });        
    }]);
    
})();