'use strict';

/**
 * @ngdoc function
 * @name dopApp.controller:GenderWidgetCtrl
 * @description
 * # GenderWidgetCtrl
 * Controller of the dopApp
 */
angular.module('dopApp')
  .config(function($stateProvider){
  })
  .controller('GenderWidgetCtrl', function($rootScope, $scope) {

    $scope.labels = ['Hombres', 'Mujeres'];
    $scope.data = [55, 23];
    $scope.colours = ['#3F51B5', '#FF4081'];  
    $scope.$on('create', function (event, chart) {
      console.log(chart);
    });

  });