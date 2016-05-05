'use strict';

/**
 * @ngdoc function
 * @name dopApp.controller:ImageBannerCtrl
 * @description
 * # ImageBannerCtrl
 * Controller of the dopApp
 */
angular.module('dopApp')
  .service('$bannerLoading', function(){
    this.flag = false;
  })
  .controller('ImageBannerCtrl', function ($scope, $auth, $http, $templateCache, $mdDialog, $imageService, $fileUploadService, $bannerLoading, Cropper, $timeout) {
    $scope.minSize = $imageService.minSize;
    $scope.resultSize = $imageService.resultSize;

    $scope.aspectRatio = $imageService.aspectRatio;
    $scope.myImage = $imageService.myImage;
    $scope.myCroppedImage = '';
    $scope.cropType = $imageService.cropType;


    $scope.loadingBanner = $bannerLoading.flag;

    $scope.data;
    $scope.cropper = {};
    $scope.cropperProxy = 'cropper.first';


    $scope.options = {
          maximize: true,
          aspectRatio:  2.11,
          dragMode: 'move',
          crop: function(dataNew) {
            $scope.data = dataNew;

          }
    };


    $scope.showEvent = 'show';
    $scope.hideEvent = 'hide';
    function showCropper() { $scope.$broadcast($scope.showEvent); }
    function hideCropper() { $scope.$broadcast($scope.hideEvent); }

    $timeout(showCropper);

    $scope.$watch(function(){
      return $bannerLoading.flag;
    }, function(flag){
      $scope.loadingBanner = flag;
    });

    var handleBannerSelect=function(evt) {
      var file = evt.currentTarget.files[0];
      var reader = new FileReader();
      reader.onload = function (evt) {
        $scope.$apply(function($scope){
          $scope.minSize = 50;
          $scope.resultSize = 1224;

          $imageService.myImage = evt.target.result;
          $imageService.file = file;
          $imageService.cropType = 'rectangle';
          $imageService.aspectRatio = 2.105;
          $mdDialog.show({
            clickOutsideToClose: true,
            controller: 'ImageBannerCtrl',
            templateUrl: '../../views/modalViews/imageCropModalView.html',
            targetEvent: 'testing',
          });
        });
      };
      reader.readAsDataURL(file);
    };
    angular.element(document.querySelector('#bannerInput')).on('change', handleBannerSelect);

    $scope.$watch(function() {
      return $imageService.myBannerCroppedImage;
    }, function(myCroppedImage) {
      $scope.myBannerCroppedImage = myCroppedImage;
    });

    $scope.doCrop = function() {
      $bannerLoading.flag = true;

      Cropper.crop($imageService.file,$scope.data)
        .then(Cropper.encode).then(function(dataUrl) {
          $imageService.myBannerCroppedImage = dataUrl;
          $scope.hide();

          $fileUploadService.uploadFileToUrl(dataUrl, $imageService.cropType)
            .then(function(resp) {
              $bannerLoading.flag = false;
            });
        });
    };

    $scope.hide = function() {
      $mdDialog.cancel();
    };
  });
