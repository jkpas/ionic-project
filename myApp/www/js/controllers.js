angular.module('starter.controllers', [])

    .controller('AppCtrl', function ($scope, $ionicModal, $timeout) {

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

    .controller('AppHomepage', function ($scope, $cordovaGeolocation) {

        var posOptions = {enableHighAccuracy: true, timeout: 2 * 3000, maximumAge: 0};

        $cordovaGeolocation
            .getCurrentPosition(posOptions)

            .then(function (position) {
                var lat = position.coords.latitude;
                var long = position.coords.longitude;
                $scope.latitude = lat;
                $scope.longitude = long;
                console.log(lat + '   ' + long)
            }, function (err) {
                console.log(err)
            });

        var watchOptions = {enableHighAccuracy: true, timeout: 2 * 3000, maximumAge: 0};
        //var watchOptions = {timeout: 5000, enableHighAccuracy: false};
        var watch = $cordovaGeolocation.watchPosition(watchOptions);

        watch.then(
            null,

            function (err) {
                console.log(err)
            },

            function (position) {
                var lat = position.coords.latitude;
                var long = position.coords.longitude;
                $scope.latitude = lat;
                $scope.longitude = long;
                console.log(lat + '' + long)
            }
        );

        //watch.clearWatch();
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

    .controller('AppCamera', function ($scope, $cordovaCamera) {

        $scope.takePicture = function () {
            var options = {
                quality: 75,
                destinationType: Camera.DestinationType.DATA_URL,
                sourceType: Camera.PictureSourceType.CAMERA,
                allowEdit: true,
                encodingType: Camera.EncodingType.JPEG,
                targetWidth: 300,
                targetHeight: 300,
                popoverOptions: CameraPopoverOptions,
                saveToPhotoAlbum: false
            };

            $cordovaCamera.getPicture(options).then(function (imageData) {
                $scope.imgURI = "data:image/jpeg;base64," + imageData;
            }, function (err) {
                // An error occured. Show a message to the user
            });
        }
    });


