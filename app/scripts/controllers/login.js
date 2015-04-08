'use strict';

/**
 * @ngdoc function
 * @name dopApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the dopApp
 */
angular.module('dopApp')
  .controller('LoginCtrl', function ($scope, $auth, $http, $templateCache) {
    $scope.signup = function() {

      $auth.signup({
        'email' : "allang@gmail.com",
        'password' : "123",
        'name': 'Edgar',
        'branch_id': 2
      })
      .then(function(response) {
        console.log(response);
        console.log(response.data);
      });

    };
    // $scope.authenticate = function(provider) {
    //   $auth.authenticate(provider);
    // };

  });
