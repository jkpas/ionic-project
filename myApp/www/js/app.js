angular.module('starter', ['ionic', 'starter.controllers', "ngCordova"])

    .run(function ($ionicPlatform) {
        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)

            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(true);

            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }
        })
    })

    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('app', {
                url: '/app',
                abstract: true,
                templateUrl: 'templates/menu.html',
                controller: 'AppCtrl'
            })

            .state('app.homepage', {
                url: '/homepage',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/homepage.html',
                        controller: 'AppHomepage'

                    }
                }
            })

            .state('app.network', {
                url: '/network',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/network.html',
                        controller: 'AppNetwork'
                    }
                }
            })

            .state('app.camera', {
                url: '/camera',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/camera.html',
                        controller: 'AppCamera'
                    }
                }
            });

        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/app/homepage');
    });
