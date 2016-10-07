(function(){
  'use strict';

  angular
    .module("tictactoe", ["ui.router"])
    .config(MainRouter);

  MainRouter.$inject = ["$stateProvider", "$urlRouterProvider", "$locationProvider"];
  function MainRouter($stateProvider, $urlRouterProvider, $locationProvider){
    $locationProvider.html5Mode(true);

    $stateProvider
    .state("home", {
      url: "/",
      templateUrl: "views/statics/home.html"
    })
    .state("rules", {
      url: "/rules",
      templateUrl: "views/statics/rules.html"
    });

    $urlRouterProvider.otherwise("/");
  }

})();
