var jQueryApiApp = {};


// 01 01 01 01 01 01 01 01 01 01 01 01 01 01 01 01 01 01 01 01 01 01 01 01 01 01 01 01 01 01 01 01 01 01

$(function(){
//console.log('01 $Ready');

	jQueryApiApp.initializeApiApp();
});

// 02 02 02 02 02 02 02 02 02 02 02 02 02 02 02 02 02 02 02 02 02 02 02 02 02 02 02 02 02 02 02 02 02 02

	jQueryApiApp.initializeApiApp = function () {
//console.log('02 initialize');

			jQueryApiApp.getLocation();
	};

// 03 03 03 03 03 03 03 03 03 03 03 03 03 03 03 03 03 03 03 03 03 03 03 03 03 03 03 03 03 03 03 03 03 03 03 03 03

	jQueryApiApp.userLocation = {};

	jQueryApiApp.getLocation = function () {
//console.log('03 location');
		
		if(navigator.geolocation) {
			navigator.geolocation.getCurrentPosition( function(position) {
				jQueryApiApp.userLocation = {latitude:position.coords.latitude, longitude:position.coords.longitude};
				userPosition = new google.maps.LatLng(jQueryApiApp.userLocation.latitude, jQueryApiApp.userLocation.longitude);
				jQueryApiApp.drawMap();
			});	
		} else {
			alert("Geolocation is not supported by your browser");
		}
	};

// 04 04 04 04 04 04 04 04 04 04 04 04 04 04 04 04 04 04 04 04 04 04 04 04 04 04 04 04 04 04 04 04 04 04 04 04 04 04

    	var mapOptions = {};
	
	jQueryApiApp.drawMap = function () {
//console.log('04 map');

		var mapCanvas = document.getElementById('map');

      		mapOptions.center = new google.maps.LatLng(43.717646, -79.373885);
      		mapOptions.zoom = 11;
      		mapOptions.mapTypeId = google.maps.MapTypeId.ROADMAP;

    	jQueryApiApp.map = new google.maps.Map(mapCanvas, mapOptions);

    	var marker = new google.maps.Marker({
		    position: new google.maps.LatLng(jQueryApiApp.userLocation.latitude, jQueryApiApp.userLocation.longitude),
		    // position: {lat: jQueryApiApp.userLocation.latitude, lng: jQueryApiApp.userLocation.longitude},
    		map: jQueryApiApp.map
  		});

  		jQueryApiApp.map.data.addListener('mouseover', function(event) {
  		   map.data.revertStyle();
  		   map.data.overrideStyle(event.feature, {strokeWeight: 8});
  		 });

    	jQueryApiApp.getApiInformation();
	};

// 05 05 05 05 05 05 05 05 05 05 05 05 05 05 05 05 05 05 05 05 05 05 05 05 05 05 05 05 05 05 05 05 05 05 05 05 05 05 05
	
	jQueryApiApp.apiKey = "91efc15f14434553d824756697b6f83fbd1b46a4e2ca4cce804948dcdf60e4b0";
	jQueryApiApp.apiUrl = {};
	jQueryApiApp.apiUrl.districts = "https://api.namara.io/v0/data_sets/8758bda9-a20a-4d07-9682-17c7cce1115b/data/en-0?api_key=";
	jQueryApiApp.apiUrl.schedule = "https://api.namara.io/v0/data_sets/79f1fe61-b394-431b-a39f-62eb27c620da/data/en-3?api_key=";
	jQueryApiApp.apiUrl.areas = "https://api.namara.io/v0/data_sets/5aa36d8d-f574-496d-9513-35360360a94d/data/en-0?api_key=";
	jQueryApiApp.userPosition = {};
	jQueryApiApp.districtsCoordinates = [];
	jQueryApiApp.areasCoordinates = [];
	jQueryApiApp.areasDistrict = [];
	jQueryApiApp.areasDay = [];
	
	jQueryApiApp.getApiInformation = function () {
//console.log('05 api');

		var districts = $.ajax({
			url: jQueryApiApp.apiUrl.districts + jQueryApiApp.apiKey, 
			method: "GET", 
			dataType: "jsonp",
			data: {
				limit: 4
			}
		});
		var areas = $.ajax({
			url: jQueryApiApp.apiUrl.areas + jQueryApiApp.apiKey,
			method: "GET", 
			dataType: "jsonp",
			data: {
				limit: 34
			}
		});
		var schedule0 = $.ajax({
			url: jQueryApiApp.apiUrl.schedule + jQueryApiApp.apiKey,
			method: "GET", 
			dataType: "jsonp",
			data: {
				limit: 150,
				offset: 0
			}
		});
		var schedule150 = $.ajax({
			url: jQueryApiApp.apiUrl.schedule + jQueryApiApp.apiKey,
			method: "GET", 
			dataType: "jsonp",
			data: {
				limit: 150,
				offset: 150
			}
		});
		var schedule300 = $.ajax({
			url: jQueryApiApp.apiUrl.schedule + jQueryApiApp.apiKey,
			method: "GET", 
			dataType: "jsonp",
			data: {
				limit: 150,
				offset: 300
			}
		});
		var schedule450 = $.ajax({
			url: jQueryApiApp.apiUrl.schedule + jQueryApiApp.apiKey,
			method: "GET", 
			dataType: "jsonp",
			data: {
				limit: 150,
				offset: 450
			}
		});
		var schedule600 = $.ajax({
			url: jQueryApiApp.apiUrl.schedule + jQueryApiApp.apiKey,
			method: "GET", 
			dataType: "jsonp",
			data: {
				limit: 28,
				offset: 600
			}
		});
		$.when( districts, areas, schedule0, schedule150, schedule300, schedule450, schedule600 )
			.done( function( districtsDone, areasDone, schedule0Done, schedule150Done, schedule300Done, schedule450Done, schedule600Done ){

			})
			.fail( function( districtsFail, areasFail, schedule0Fail, schedule150Fail, schedule300Fail, schedule450Fail, schedule600Fail ){ 
				console.log( districtsFail );
				console.log( areasFail );
				console.log( schedule0Fail );
				console.log( schedule150Fail );
				console.log( schedule300Fail );
				console.log( schedule450Fail );
				console.log( schedule600Fail );
			});
		$.when.apply( $, [ districts, areas, schedule0, schedule150, schedule300, schedule450, schedule600 ]).then( function(districtsArray, areasArray, schedule0Array, schedule150Array, schedule300Array, schedule450Array, schedule600Array ){ 
// districts
			for( j=0; j < districtsArray[0].length; j++) {
				
				jQueryApiApp.districtsCoordinates[j] = [];

				for( i=0; i < districtsArray[0][j].geometry.coordinates[0].length; i++) {
					jQueryApiApp.districtsCoordinates[j].push( { 
						lat: parseFloat(districtsArray[0][j].geometry.coordinates[0][i][1]),
						lng: parseFloat(districtsArray[0][j].geometry.coordinates[0][i][0])
					});
				} 
			}
// areas
			for( j=0; j < areasArray[0].length; j++) {

				jQueryApiApp.areasDistrict[j] = areasArray[0][j].area;
				jQueryApiApp.areasDay[j] = areasArray[0][j].area_name;

				jQueryApiApp.areasCoordinates[j] = [];

				for( i=1; i < areasArray[0][j].geometry.coordinates[0].length; i++) { 
					jQueryApiApp.areasCoordinates[j].push( { 
						lat: parseFloat(areasArray[0][j].geometry.coordinates[0][i][1]),
						lng: parseFloat(areasArray[0][j].geometry.coordinates[0][i][0])
					});
				}
			}

// schedule
// console.log(schedule0.responseJSON);
// console.log(schedule150.responseJSON);
// console.log(schedule300.responseJSON);
// console.log(schedule450.responseJSON);
// console.log(schedule600.responseJSON);

			jQueryApiApp.drawDistricts();
		});
	};

// 06 06 06 06 06 06 06 06 06 06 06 06 06 06 06 06 06 06 06 06 06 06 06 06 06 06 06 06 06 06 06 06 06 06 06

	jQueryApiApp.drawDistricts = function () {
//console.log('06 districts');

    	var districtsPolygon = [];

    	for(i = 0; i < jQueryApiApp.districtsCoordinates.length; i++) {
    		districtsPolygon = new google.maps.Polygon({
	    		paths: jQueryApiApp.districtsCoordinates[i],
	    	 	strokeColor: '#000',
	    	 	strokeOpacity: 0.4,
	    	  	strokeWeight: 2,
	    	  	fillColor: '#000',
	    	  	fillOpacity: 0.175
			});

    		if ( google.maps.geometry.poly.containsLocation( userPosition, districtsPolygon) ) { 
    			districtsPolygon.strokeOpactiy = 0.8;
    			districtsPolygon.fillOpacity = 0.35;
    		}

    	districtsPolygon.setMap(jQueryApiApp.map);
    	}

    	jQueryApiApp.drawAreas();
	};

// 07 07 07 07 07 07 07 07 07 07 07 07 07 07 07 07 07 07 07 07 07 07 07 07 07 07 07 07 07 07 07 07 07 07

	jQueryApiApp.drawAreas = function () {
//console.log('07 areas');

    	var areasPolygon = [];
    	for(i=0; i < jQueryApiApp.areasCoordinates.length; i++) {
    		areasPolygon = new google.maps.Polygon({
	    		paths: jQueryApiApp.areasCoordinates[i],
	    	 	strokeColor: '#7FFF00',
	    	 	strokeOpacity: 0.0,
	    	  	strokeWeight: 2,
	    	  	fillColor: '#7FFF00',
	    	  	fillOpacity: 0.0
			});

    		if ( google.maps.geometry.poly.containsLocation( userPosition, areasPolygon) ) { 
    			areasPolygon.strokeOpacity = 0.8;
    			areasPolygon.fillOpacity = 0.35;

    			var pickupDistrict = jQueryApiApp.areasDistrict[i].split(" ", 2)[1];
    			var pickupDay = jQueryApiApp.areasDay[i].split(" ", 1)[0].toLowerCase();

    			// pickupDistrict = pickupDistrict.charAt(0).toUpperCase() + pickupDistrict.substr(1);
    			pickupDay = pickupDay.charAt(0).toUpperCase() + pickupDay.substr(1);

    			$('.district span').html(pickupDistrict);
    			$('.day span').html(pickupDay);
    		}
    		areasPolygon.setMap(jQueryApiApp.map);
	  	}
    	jQueryApiApp.displayResults();
	};

// 08 08 08 08 08 08 08 08 08 08 08 08 08 08 08 08 08 08 08 08 08 08 08 08 08 08 08 08 08 08 08 08 08 08

	jQueryApiApp.displayResults = function () {
//console.log('08 display');
		jQueryApiApp.collectUserInformation();
	};


// 09 09 09 09 09 09 09 09 09 09 09 09 09 09 09 09 09 09 09 09 09 09 09 09 09 09 09 09 09 09 09 09 09 09 09 09 09

	jQueryApiApp.collectUserInformation = function () {
//console.log('09 collect');

	};