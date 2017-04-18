/**
 * Created by NehaP on 4/1/2017.
 */

angular.module('myApp')

    .controller('MapInfoController', ['$scope', '$http', 'StorageService', 'MapService',  function ($scope, $http, StorageService, MapService) {
        //localStorage.clear();
        $scope.coordinates = [];
        var markers = [];


        // Load PCT data and create Markers
        $scope.loadPCT = function () {

           $scope.message = "Loading PCT Coordinates...";
           var coords = StorageService.getCoordinates();

           if(coords !== null) {
               console.log ("Loading from local");
               $scope.showPCTCoordinates = true;
                $scope.coordinates = coords;
                markers = MapService.createMarkers($scope.coordinates , $scope.map);
           } else {
                $http.get('pct-data.json').success(function (data) {
                    $scope.coordinates = StorageService.createCoordinates(data);
               }).finally (function() {
                    $scope.showPCTCoordinates = true;
                    markers = MapService.createMarkers($scope.coordinates , $scope.map);
                });
           }

        };

        // Delete single PCT data and Marker
        $scope.removePCT = function (id, index) {

            StorageService.removeCoordinate(id);
            $scope.coordinates.splice(index, 1);
            markers[index].setMap(null);
            markers.splice(index,1);

        };

        // Save the new PCT Data after Edit
        $scope.savePCT = function (data, index) {

            data.editable = false;
            StorageService.updateCoordinates(data);
            var latLng = new google.maps.LatLng(data.lat,data.long);
            markers[index].setPosition(latLng);

        };

        $scope.editPCT = function (data) {

            data.editable = true;

        };

        $scope.cancel = function(data) {

            data.editable = false;

        };

        // Add new PCT data to local Storage and create associated Marker
        $scope.addPCT = function() {

            var lat = document.getElementById("lat").value;
            var lng = document.getElementById("lng").value;
            console.log (lat, lng);
            // validate lat, lng
            var regLat = new RegExp("^(\\+|-)?(?:90(?:(?:\\.0{1,6})?)|(?:[0-9]|[1-8][0-9])(?:(?:\\.[0-9]{1,6})?))$");
            var regLng = new RegExp("^(\\+|-)?(?:180(?:(?:\\.0{1,6})?)|(?:[0-9]|[1-9][0-9]|1[0-7][0-9])(?:(?:\\.[0-9]{1,6})?))$");
            if(regLat.test(lat) === false || regLng.test(lng) === false) {

                alert('Invalid latitude/longitude values');
                return;
            }

            var nextIndex = $scope.coordinates.length;
            var mileMarker = 0;
            if (nextIndex > 0) {

                mileMarker = $scope.coordinates[nextIndex-1].mileMarker + 0.5;
            }

            var coordinate = {};
            coordinate["mileMarker"] = mileMarker;
            coordinate["lat"] = parseFloat(lat);
            coordinate["long"] = parseFloat(lng);
            coordinate["id"] = nextIndex;
            coordinate["editable"] = false;

            // Update table
            $scope.coordinates.push(coordinate);

            // Update local storage
            StorageService.addCoordinates(coordinate);

            // Update map
            markers.push(MapService.addMileMarker(coordinate, $scope.map));

            // cleaning textbox values
            document.getElementById("lat").value = "";
            document.getElementById("lng").value = "";

        };


        // Find the nearest PCT coordinates
        $scope.findNearestPCT = function () {

            var lat = document.getElementById("latFind").value;
            var lng = document.getElementById("lngFind").value;

            // validate lat, lng
            var regLat = new RegExp("^(\\+|-)?(?:90(?:(?:\\.0{1,6})?)|(?:[0-9]|[1-8][0-9])(?:(?:\\.[0-9]{1,6})?))$");
            var regLng = new RegExp("^(\\+|-)?(?:180(?:(?:\\.0{1,6})?)|(?:[0-9]|[1-9][0-9]|1[0-7][0-9])(?:(?:\\.[0-9]{1,6})?))$");
            if(regLat.test(lat) === false || regLng.test(lng) === false) {

                alert('Invalid latitude/longitude values');
                return;
            }

            var coordinate = {};
            coordinate["lat"] = parseFloat(lat);
            coordinate["long"] = parseFloat(lng);

            var index = MapService.findNearestPCTIndex(coordinate, $scope.coordinates);

            // zooming into the map
            $scope.map.setZoom(17);
            $scope.map.panTo(markers[index].position);

            // cleaning textbox values
            document.getElementById("latFind").value = "";
            document.getElementById("lngFind").value = "";

        };

        // Loading Map
        $scope.map = MapService.loadMap();

    }]);


