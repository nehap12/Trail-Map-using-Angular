/**
 * Created by NehaP on 4/1/2017.
 */

'use strict';

angular.module('myApp')

    .service('StorageService', function() {

    // Get stored coordinates from local storage
    this.getCoordinates = function() {
        var coordinates=[];

        if (localStorage.length === 0) return null;
        else
        {
            for (var i=0; i<localStorage.length; i++)
            {
                var coordinate = {};
                var key = localStorage.key(i);
                var value = JSON.parse(localStorage.getItem(key));

                coordinate["mileMarker"] = value[0];
                coordinate["lat"] = value[1];
                coordinate["long"] = value[2];
                coordinate["id"] = i;
                coordinate["editable"] = false;
                coordinates.push(coordinate);
            }
        }
        coordinates.sort(function(a,b){
            return (parseFloat(JSON.stringify(a["mileMarker"])) - parseFloat(JSON.stringify(b["mileMarker"])));
        });

        return coordinates;
    };

    // Create new coordinates in local storage
    this.createCoordinates = function (coordinateData) {

        var coordinates = [] ;
        for (var i=0; i<coordinateData.length; i++)
        {
            var coordinate = {};

            localStorage.setItem(JSON.stringify(coordinateData[i][0]), JSON.stringify(coordinateData[i]));
            coordinate["mileMarker"] = coordinateData[i][0];
            coordinate["lat"] = coordinateData[i][1];
            coordinate["long"] = coordinateData[i][2];
            coordinate["id"] = i;
            coordinate["editable"] = false;
            coordinates.push(coordinate);
        }
        return coordinates;
    };

    // Add new coordinates to local storage
    this.addCoordinates = function (data) {
        var key = data.mileMarker;
        var value = [];
        value.push(data.mileMarker,data.lat,data.long);
        localStorage.setItem(key, JSON.stringify(value));
    };

    // remove coordinates from local storage
    this.removeCoordinate = function (key) {
        localStorage.removeItem(key);
    };

    // update coordinates in local storage
    this.updateCoordinates = function (data) {
        var key = data.mileMarker;
        var value = [];
        value.push(data.mileMarker,data.lat,data.long);
        localStorage.setItem(key, JSON.stringify(value));
    };
});