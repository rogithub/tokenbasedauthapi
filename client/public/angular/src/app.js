(function () {
    var app = angular.module('app', ['ngRoute']);
    

    app.config(["$routeProvider", function ($router) {
                
        $router.when("/", { templateUrl: "angular/views/index.html" })
        .when("/login", { templateUrl: "angular/views/login.html" })
        
        
        .otherwise({ redirectTo: "/" });        
    }]);
    
})();