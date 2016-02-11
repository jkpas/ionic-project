angular.module('starter.controllers', [])

    .controller('AppCtrl', function ($scope, $ionicModal, $timeout) {

        // With the new view caching in Ionic, Controllers are only called
        // when they are recreated or on app start, instead of every page change.
        // To listen for when this page is active (for example, to refresh data),
        // listen for the $ionicView.enter event:
        //$scope.$on('$ionicView.enter', function(e) {
        //});

        // Form data for the login modal
        $scope.loginData = {};

        // Create the login modal that we will use later
        $ionicModal.fromTemplateUrl('templates/login.html', {
            scope: $scope
        }).then(function (modal) {
            $scope.modal = modal;
        });

        // Triggered in the login modal to close it
        $scope.closeLogin = function () {
            $scope.modal.hide();
        };

        // Open the login modal
        $scope.login = function () {
            $scope.modal.show();
        };

        // Perform the login action when the user submits the login form
        $scope.doLogin = function () {
            console.log('Doing login', $scope.loginData);

            // Simulate a login delay. Remove this and replace with your login
            // code if using a login system
            $timeout(function () {
                $scope.closeLogin();
            }, 1000);
        };
    })

    .controller('AppNetwork', function ($scope, $cordovaNetwork, $rootScope) {
        document.addEventListener("deviceready", function () {

            $scope.network = $cordovaNetwork.getNetwork();
            $scope.$apply();

            // listen for Online event
            $rootScope.$on('$cordovaNetwork:online', function (event, networkState) {
                $scope.network = $cordovaNetwork.getNetwork();
                $scope.$apply();
            });

            // listen for Offline event
            $rootScope.$on('$cordovaNetwork:offline', function (event, networkState) {
                console.log("got offline");
                $scope.network = $cordovaNetwork.getNetwork();
                $scope.$apply();
            })

        }, false);
    })

    .controller('AppCamera', function($scope, $cordovaCamera) {

        $scope.takePicture = function() {
            var options = {
                quality : 75,
                destinationType : Camera.DestinationType.DATA_URL,
                sourceType : Camera.PictureSourceType.CAMERA,
                allowEdit : true,
                encodingType: Camera.EncodingType.JPEG,
                targetWidth: 300,
                targetHeight: 300,
                popoverOptions: CameraPopoverOptions,
                saveToPhotoAlbum: false
            };

            $cordovaCamera.getPicture(options).then(function(imageData) {
                $scope.imgURI = "data:image/jpeg;base64," + imageData;
            }, function(err) {
                // An error occured. Show a message to the user
            });
        }
    })

    .controller('AppHomepage', function($scope, $cordovaGeolocation) {

        var posOptions = {timeout: 10000, enableHighAccuracy: false};

        $cordovaGeolocation
            .getCurrentPosition(posOptions)

            .then(function (position) {
                var lat  = position.coords.latitude;
                var long = position.coords.longitude;
                $scope.location = lat + '   ' + long;
                console.log(lat + '   ' + long)
            }, function(err) {
                console.log(err)
            });

        var watchOptions = {timeout : 3000, enableHighAccuracy: false};
        var watch = $cordovaGeolocation.watchPosition(watchOptions);

        watch.then(
            null,

            function(err) {
                console.log(err)
            },

            function(position) {
                var lat  = position.coords.latitude;
                var long = position.coords.longitude;
                $scope.location = lat + '   ' + long;
                console.log(lat + '' + long)
            }
        );

        watch.clearWatch();
    });

    //.controller('AppHomepage', function ($scope, $cordovaGeolocation, $ionicLoading, $ionicPlatform) {
    //
    //    $scope.map = { center: { latitude: 45, longitude: -73 }, zoom: 8 };
    //
    //    $ionicPlatform.ready(function() {
    //
    //        $ionicLoading.show({
    //            template: '<ion-spinner icon="bubbles"></ion-spinner><br/>Acquiring location!'
    //        });
    //
    //        var posOptions = {
    //            enableHighAccuracy: true,
    //            timeout: 20000,
    //            maximumAge: 0
    //        };
    //
    //        $cordovaGeolocation.getCurrentPosition(posOptions).then(function (position) {
    //            var lat  = position.coords.latitude;
    //            var long = position.coords.longitude;
    //
    //            var myLatlng = new google.maps.LatLng(lat, long);
    //
    //            var mapOptions = {
    //                center: myLatlng,
    //                zoom: 16,
    //                mapTypeId: google.maps.MapTypeId.ROADMAP
    //            };
    //
    //            var map = new google.maps.Map(document.getElementById("map"), mapOptions);
    //
    //            $scope.map = map;
    //            $ionicLoading.hide();
    //
    //        }, function(err) {
    //            $ionicLoading.hide();
    //            console.log(err);
    //        });
    //    });
    //})

