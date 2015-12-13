/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        //app.receivedEvent('deviceready');
	navigator.geolocation.watchPosition(
		function (position) {
			// onSuccess
			var lat = document.getElementById('lat');
			var lon = document.getElementById('lon');
			var x2154_10k = document.getElementById('x2154_10k');
			var y2154_10k = document.getElementById('y2154_10k');
			var epsg4326 = "+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs";
			var epsg2154 = "+proj=lcc +lat_1=49 +lat_2=44 +lat_0=46.5 +lon_0=3 +x_0=700000 +y_0=6600000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs";
			lat.innerHTML = position.coords.latitude;
			lon.innerHTML = position.coords.longitude;

			var point2154 = proj4(epsg4326, epsg2154, [position.coords.longitude, position.coords.latitude]);

			x2154_10k.innerHTML = parseInt(point2154[0]/10000);
			y2154_10k.innerHTML = parseInt(point2154[1]/10000);
			var cx = 100 + 800 * (point2154[0]/10000 - parseInt(point2154[0]/10000));
			var cy = 100 + 800 - 800 * (point2154[1]/10000 - parseInt(point2154[1]/10000));
			pt = document.getElementById('pt');
			pt.setAttribute('cx', 100 + 800 * (point2154[0]/10000 - parseInt(point2154[0]/10000)));
			pt.setAttribute('cy', 100 + 800 - 800 * (point2154[1]/10000 - parseInt(point2154[1]/10000)));
		},
		function (error) {
			// onError
			var err = document.getElementById('err');
			err.innerHTML = err.message;
		}
	);
    }
    // Update DOM on a Received Event
 /*   receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    } */
};
