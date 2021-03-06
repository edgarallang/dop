'use strict';

/**
 * @ngdoc function
 * @name dopApp.controller:ImageCtrl
 * @description
 * # ImageCtrl
 * Controller of the dopApp
 */

angular.module('dopApp')
  .service('$imageService', function($timeout){
    this.myImage = '';
    this.myLogoCroppedImage = '';
    this.myBannerCroppedImage = '';
    this.cropType = 'square';
    this.aspectRatio = 1.0;
    this.minSize = 300;
    this.resultSize = 1224;
    this.file = '';
  })
  .service('$fileUploadService', function ($http, $userService) {

    this.uploadFileToUrl = function(file, type){
      var companyId = $userService.currentUser.company_id;
      var uploadUrl = 'http://45.55.7.118:5000/api/company/branch/'+companyId+'/upload/';

      if(type === 'square'){
        uploadUrl= uploadUrl+"logo";
      }else{
        uploadUrl= uploadUrl+"banner";
      }
      var fd = new FormData();
      fd.append('file', file);
      var promise = $http.post(uploadUrl, fd, {
        transformRequest: angular.identity,
        headers: {'Content-Type': undefined}
      });
      return promise;
    };
  })
  .config(function($stateProvider){
    $stateProvider
      // HOME STATES AND NESTED VIEWS ========================================
      .state('image.dashboard', {
        views: {
            // the child views will be defined here (absolutely named)
            'logoView': {
              templateUrl: '../../views/imageViews/logoView.html',
              controller: 'ImageLogoCtrl'
            },
            'bannerView': {
              templateUrl: '../../views/imageViews/bannerView.html',
              controller: 'ImageBannerCtrl'
            },
            'locatorView': {
              templateUrl: '../../views/imageViews/locatorView.html',
              controller: 'ImageLocatorCtrl'
            },
            'aboutView': {
              templateUrl: '../../views/imageViews/aboutView.html',
              controller: 'ImageAboutCtrl'
            }
        }
      });
  })
  .controller('ImageCtrl', function ($scope, $http, $auth, $locatorService, $aboutService, $userService, $mdToast, $imageService, $state) {
    $state.go('image.dashboard');

    $scope.setLocation = function(event) {
      var about = $aboutService.about;
      var data = {};
      if (about.phone || about.description || about.name) {
        data = { about: about,
                 locator: $locatorService.locatorItem
        };
      } else {
        data = { locator: $locatorService.locatorItem };
      }
      $scope.branch_id = $userService.currentUser.branch_id;
      $scope.url = 'http://45.55.7.118:5000/api/company/'+$scope.branch_id+'/config/set';
      $http({
        method: 'POST',
        url: $scope.url,
        data: { 'data': data},
        headers: { 'Authorization': $auth.getToken() }
      }).success(function(message) {
        $mdToast.show(
          $mdToast.simple()
            .textContent('CAMBIOS GUARDADOS.')
            .position('top right')
            .hideDelay(3500)
            .theme('success-toast')
        );
        console.log(message);
      });
    };

  });
