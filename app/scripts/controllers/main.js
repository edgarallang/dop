'use strict';

/**
 * @ngdoc function
 * @name dopApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the dopApp
 */
angular.module('dopApp')
  .config(function($stateProvider){
    $stateProvider
        // HOME STATES AND NESTED VIEWS ========================================
        .state('/dashboard', {
          url: '/',
          views: {
              // the child views will be defined here (absolutely named)
              'genderChart': {
                templateUrl: '../../views/dashboardViews/genderView.html',
                controller: 'GenderWidgetCtrl'
              },
              'couponStatusChart': {
                templateUrl: '../../views/dashboardViews/couponView.html',
                controller: 'CouponWidgetCtrl'
              }
          }
        });
  })
  .controller('MainCtrl', function($scope, $state) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $state.go("/dashboard");
  })


  