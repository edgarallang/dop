'use strict';

/**
 * @ngdoc function
 * @name dopApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the dopApp
 */
angular.module('dopApp')
  .controller('LoginCtrl', function($userService, $scope, $auth, $http, $templateCache, SweetAlert) {

    $scope.login = function() {
      $auth.login({
        'email': $scope.user,
        'password': $scope.password
      })
      .then(function(response) {
        $auth.setToken(response.data.token, false);
        $scope.setGlobalUser();
      })
      .catch(function(response) {
          SweetAlert.swal("Oops!", "El usuario y/o contraseña son incorrectos ", "error");
      });

    };

    $scope.setGlobalUser = function () {
      var payload = $auth.getPayload();

      $http({
        method: 'POST',
        url: 'http://104.236.141.44:5000/api/company/me',
        data: { 'branches_user_id': payload.id },
        headers: {'Content-Type': 'application/json'}
      }).success(function(data){
        var user = data.data
        $userService.setUser(payload.id, user.branch, user.name, user.email, user.branch_id);
        console.log($userService);
      });
    }
    // $scope.authenticate = function(provider) {
    //   $auth.authenticate(provider);
    // };

  });
