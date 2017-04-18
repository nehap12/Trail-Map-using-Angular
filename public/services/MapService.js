/**
 * Created by NehaP on 4/1/2017.
 */

'use strict';
angular.module('myApp')

    .service('MapService', function() {

        var markerCluster;

        var mapOptions = {
            zoom: 5,
            center: new google.maps.LatLng(32.58971, -116.46696),
            mapTypeId: google.maps.MapTypeId.TERRAIN
        };

        // Loading the map with static coordinates
        this.loadMap = function(){
            return new google.maps.Map(document.getElementById('map'), mapOptions);
        };

        // Create Markers with incoming data
        this.createMarkers = function (coords, map) {
            var markers = [];
            for (var i = 0; i < coords.length; i++){
                var latLng = new google.maps.LatLng(coords[i].lat,coords[i].long);
                var marker = new google.maps.Marker({'position': latLng,
                    title: JSON.stringify (coords[i].mileMarker)
                });
                markers.push(marker);
            }

            // Create clustering of Markers to avoid application crash
            markerCluster = new MarkerClusterer(map, markers,
                {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});


            return markers;
        };

        // Add new Marker
        this.addMileMarker = function (coord, map) {

            var latLng = new google.maps.LatLng(coord.lat,coord.long);
            var marker = new google.maps.Marker ({'position': latLng,
                title: JSON.stringify (coord.mileMarker)});
            marker.setMap(map);
            return marker;
        };

        // Find nearest Marker
        this.findNearestPCTIndex = function (latLng, coordinates) {

            var latLng = new google.maps.LatLng(latLng.lat,latLng.long);

            var minDistance = Number.MAX_VALUE;
            var minIndex = -1;
            for (var i = 0; i < coordinates.length; i++) {
                var latLngMarker = new google.maps.LatLng(coordinates[i].lat, coordinates[i].long);
                var dist = google.maps.geometry.spherical.computeDistanceBetween(latLng, latLngMarker);
                if (dist < minDistance)
                {
                    minDistance = dist;
                    minIndex = i;
                }
            }

            return minIndex;
        };


});
