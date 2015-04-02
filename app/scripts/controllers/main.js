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
              'ageChart': {
                templateUrl: '../../views/dashboardViews/ageView.html',
                controller: 'AgeWidgetCtrl'
              },
              'couponStatusChart': {
                templateUrl: '../../views/dashboardViews/couponView.html',
                controller: 'CouponWidgetCtrl'
              },
              'locationChart': {
                templateUrl: '../../views/dashboardViews/locationView.html',
                controller: 'LocationWidgetCtrl'
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


  