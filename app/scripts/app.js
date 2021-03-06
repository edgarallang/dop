/**
 * @ngdoc overview
 * @name dopApp
 * @description
 * dopApp
 *
 * Main module of the application.
 */
var app = angular
  .module('dopApp', [
    'ngAnimate',
    'ngCookies',
    'ngSanitize',
    'ngResource',
    'ngRoute',
    'ui.router',
    'ngAria',
    'ngMaterial',
    'chart.js',
    'uiGmapgoogle-maps',
    'satellizer',
    'angular-jwt',
    'oitozero.ngSweetAlert',
    '720kb.datepicker',
    'restangular',
    'dibari.angular-ellipsis',
    'md.data.table',
    'ngImgCrop',
    'ngDroplet',
    'locator',
    'base64',
    'ngCropper',
    'angularMoment',
    'btford.socket-io',
    'ngMdIcons',
    'ngMessages',
  ])
  .factory('$socket', function (socketFactory) {
      return socketFactory({
        prefix: 'foo~',
        ioSocket: io.connect('http://45.55.7.118', { secure: true, transports: [ "flashsocket","polling","websocket" ] })
      });
  })
  .service('$userService', function ($auth, $http, SweetAlert) {
    this.currentUser = null;
    this.payment_sources = null;
    this.loading = false;
    this.fromLogin = false;
    var self = this;

    this.setUser = function (currentUser, payment_sources) {
      this.currentUser = currentUser;
      this.payment_sources = payment_sources;
    };

    this.getCurrentUser = function () {
      return this.currentUser;
    };

    this.getMe = function () {
      var payload = $auth.getPayload();
      return $http({
        method: 'POST',
        url: 'http://45.55.7.118/api/company/me',
        data: { 'branches_user_id': payload.id },
        headers: { 'Content-Type': 'application/json' }
      }).success(function (data) {
        self.loading = false;
        return data.data;
      }).error(function (message) {
        SweetAlert.swal(message, '', 'error');
        self.loading = false;
      });
    };

  })
  .config(function ($stateProvider, $urlRouterProvider, $mdThemingProvider,
                    $locationProvider, $httpProvider, $authProvider, RestangularProvider) {
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
    RestangularProvider.setBaseUrl('http://45.55.7.118:5000/api');
    RestangularProvider.setDefaultHeaders({ 'token' : 'application/json' });
    $authProvider.signupUrl = 'http://45.55.7.118:5000/api/company/auth/signup';
    $authProvider.loginUrl = 'http://45.55.7.118:5000/api/company/auth/login';
    $authProvider.facebook({ clientId: '927375797314743' });

    var skipIfLoggedIn = ['$q', '$auth', '$location', function($q, $auth, $location) {
      var deferred = $q.defer();
      if ($auth.isAuthenticated()) {
        $location.path('/');
        deferred.reject();
      } else {
        deferred.resolve();
      }
      return deferred.promise;
    }];

    var loginRequired = ['$q', '$location', '$auth', function($q, $location, $auth) {
      var deferred = $q.defer();
      if ($auth.isAuthenticated()) {
        deferred.resolve();
      } else {
        $location.path('/login');
      }
      return deferred.promise;
    }];

    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        resolve: {
          loginRequired: loginRequired,
          userService: function ($q, $location, $auth, $http, $userService, SweetAlert) {
            var deferred = $q.defer();
            //var payload = $auth.getPayload();
            if (!$userService.getCurrentUser()) {
              $userService.getMe().success(function (data) {
                var user = data.data[0];
                $userService.setUser(user, data.payment_sources);
                deferred.resolve();
              }).error(function (message) {
                SweetAlert.swal(message, 'error');
              });
            } else { deferred.resolve(); }
            return deferred.promise;
          }
        }
      })
      .state('login', {
        url: '/login',
        templateUrl: 'login.html',
        controller: 'LoginCtrl',
        resolve: {
          skipIfLoggedIn: skipIfLoggedIn
        }
      })
      .state('signup', {
        url: '/signup',
        templateUrl: 'signup.html',
        controller: 'SignupCtrl',
        resolve: {
          skipIfLoggedIn: skipIfLoggedIn
        }
      })
      .state('coupon', {
        url: '/coupon',
        templateUrl: 'views/coupon.html',
        controller: 'CouponCtrl',
        resolve: {
          loginRequired: loginRequired,
          userService: function ($q, $location, $auth, $http, $userService, SweetAlert) {
            var deferred = $q.defer();
            //var payload = $auth.getPayload();
            if (!$userService.getCurrentUser()) {
              $userService.getMe().success(function (data){
                var user = data.data[0];
                $userService.setUser(user, data.payment_sources);
                deferred.resolve();
              }).error(function (){
                SweetAlert.swal('Error en el servidor', '', 'error');
              });
            } else { deferred.resolve(); }
            return deferred.promise;
          }
        }
      })
       .state('loyalty', {
         url: '/loyalty',
         templateUrl: 'views/loyalty.html',
         controller: 'LoyaltyCtrl',
         resolve: {
          loginRequired: loginRequired,
           userService: function ($q, $location, $auth, $http, $userService, SweetAlert) {
             var deferred = $q.defer();
             //var payload = $auth.getPayload();
             if (!$userService.getCurrentUser()) {
               $userService.getMe().success(function (data){
                 var user = data.data[0];
                 $userService.setUser(user, data.payment_sources);
                 deferred.resolve();
               }).error(function (){
                 SweetAlert.swal('Error en el servidor', '', 'error');
               });
             } else { deferred.resolve(); }
             return deferred.promise;
           }
         }
       })
      .state('image', {
        url: '/image',
        templateUrl: 'views/image.html',
        controller: 'ImageCtrl',
        resolve: {
          loginRequired: loginRequired,
          userService: function ($q, $location, $auth, $http, $userService, SweetAlert) {
            var deferred = $q.defer();
            //var payload = $auth.getPayload();
            if (!$userService.getCurrentUser()) {
              $userService.getMe().success(function (data){
                var user = data.data[0];
                $userService.setUser(user, data.payment_sources);
                deferred.resolve();
              }).error(function (){
                SweetAlert.swal('Error en el servidor', '', 'error');
              });
            } else { deferred.resolve(); }
            return deferred.promise;
          }
        }
      })
      .state('notification', {
        url: '/notification1991',
        templateUrl: 'notification.html',
        controller: 'NotificationCtrl',
        resolve: {
          authenticated: function ($q, $location, $auth) {
            var deferred = $q.defer();
            if ($auth.isAuthenticated()) { deferred.reject(); }
            else { deferred.resolve(); }
            return deferred.promise;
          }
        }
      })
      .state('problems', {
        url: '/problems',
        templateUrl: 'problems.html',
        controller: 'ReportPreviewCtrl',
        resolve: {
          authenticated: function ($q, $location, $auth) {
            var deferred = $q.defer();
            if ($auth.isAuthenticated()) { deferred.reject(); }
            else { deferred.resolve(); }
            return deferred.promise;
          }
        }
      })
    
    // $locationProvider.html5Mode({
    //   enabled: true,
    //   requireBase: false
    // });
    $urlRouterProvider.otherwise('/');
    // Theme configurations

    $mdThemingProvider.theme('green')
      .primaryPalette('light-green')
      .accentPalette('blue');


    $mdThemingProvider.definePalette('dopPalette', {
      '50': '#ffffff',
      '100': '#fedbe8',
      '200': '#fda4c4',
      '300': '#fc5e96',
      '400': '#fc4083',
      '500': '#fb226f',
      '600': '#fa055c',
      '700': '#dc0451',
      '800': '#be0346',
      '900': '#a0033b',
      'A100': '#ffffff',
      'A200': '#fedbe8',
      'A400': '#fc4083',
      'A700': '#dc0451',
      'contrastDefaultColor': 'light',
      'contrastDarkColors': '50 100 200 300 A100 A200'
    });

    $mdThemingProvider.theme('defaults')
      .primaryPalette('dopPalette', {
          'default': '400',
          'hue-1': '100',
          'hue-2': '300'
      });
})
  .controller('MeCtrl', function ($scope, $http, $auth, $userService, $mdSidenav,
                                   $log, $location, $mdDialog, $socket) {
    $scope.init = function () {
      if (!$userService.getCurrentUser() && $auth.isAuthenticated()) {
        var payload = $auth.getPayload();
        $http({
          method: 'POST',
          url: 'http://45.55.7.118/api/company/me',
          data: { 'branches_user_id': payload.id },
          headers: {'Content-Type': 'application/json'}
        }).success(function (data){
          $userService.setUser(data.data[0], data.payment_sources);
          $scope.user = $userService.getCurrentUser();
          $socket.emit('waitingForRedeemWebAdmin', {
              branch_id: $scope.user.branch_id
          });
        });
      } else {
        $location.path('/login');
      }
    };
    // $scope.openMenu = function ($mdOpenMenu, ev) {
    //   var originatorEv = ev;
    //   $mdOpenMenu(ev);
    // };

    $scope.logout = function () {
      if (!$auth.isAuthenticated()) { return; }
      $auth.logout()
        .then(function () {
          // toastr.info('You have been logged out');
          $userService.currentUser = null;
          // $location.path('/login');
          location.reload();
        });
    };
  })
  .controller('TabController', function ($scope, $state, $location, $userService, $log, $mdSidenav,
                                         $http, $templateCache, $auth, $mdDialog, $auth) {
    // if (!$userService.fromLogin) { $scope.reload = false; } else { $scope.reload = true; }
    //if (!$auth.isAuthenticated()) {$location.path('/login')};
    $scope.reload = true;
    $scope.$watch(function () {
      return $userService.loading;
    }, function (flag) {
        $scope.loading = flag;
    });

    $scope.$watch(function () {
      return $userService.currentUser;
    }, function (user) {
      $scope.user = user;
    });

    if ($userService.currentUser !== null) {
      $scope.$watch(function () {
        return $userService.currentUser.credits;
      }, function (credits) {
        $scope.user.credits = credits;
      });
    }

    $scope.isAuthenticated = function () {
      return $auth.isAuthenticated();
    };

    $scope.showCreditModal = function (ev) {
      $mdDialog.show({
        clickOutsideToClose: false,
        controller: 'AddCreditModalCtrl',
        templateUrl: '../views/modalViews/addCreditModalView.html',
        targetEvent: ev,
      })
      .then(function (answer) {
        //SweetAlert.swal("Cancelado", "Tu compra ha sido cancelada :)", "error");
      }, function () {
        $scope.alert = 'You cancelled the dialog.';
      });
    };
  
    $scope.showProModal = function (ev) {
      $mdDialog.show({
        clickOutsideToClose: true,
        controller: 'BecomeProModalCtrl',
        templateUrl: '../views/modalViews/becomeProModalView.html',
        targetEvent: ev,
      });
    };
  
    $scope.$watch('data.selectedIndex', function () {
      // tab selected change
      if ($userService.fromLogin) { $scope.reload = false; }
      if ($scope.data && !$scope.reload) {
        if ($scope.data.selectedIndex === 0 && $auth.isAuthenticated() ) {
          $location.path('/').replace();
          $userService.fromLogin = false;
        } else if ($scope.data.selectedIndex === 1 && $auth.isAuthenticated()) {
          $location.path('/coupon').replace();
          $userService.fromLogin = false;
         } else if ($scope.data.selectedIndex === 2 && $auth.isAuthenticated()) {
           $location.path('/loyalty').replace();
           $userService.fromLogin = false;
         } else if ($scope.data.selectedIndex === 3 && $auth.isAuthenticated()) {
           $location.path('/image').replace();
           $userService.fromLogin = false;
         }
      }

      //  paint tab after reload
      if ($scope.data && $scope.reload) {
        if ($location.path() === '/') {
          $scope.data.selectedIndex = 0;
          $scope.reload = false;
        } else if ($location.path() === '/coupon') {
          $scope.data.selectedIndex = 1;
          $scope.reload = false;
         } else if ($location.path() === '/loyalty') {
           $scope.data.selectedIndex = 2;
           $scope.reload = false;
        } else if ($location.path() === '/image') {
          $scope.data.selectedIndex = 3;
          $scope.reload = false;
        }
      }
    });

  });
