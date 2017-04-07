import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux';
import ReactFauxDOM from 'react-faux-dom';
import { Provider, connect } from 'react-redux';

import App from './components/app.js';

import { store } from './store.js';

// console.log("Provider: ", Provider);
// console.log("App: ", App);

store.subscribe(() => {
  console.log("Application state: ", store.getState());
});

// container component
var Wrapper = connect(
	function mapStateToProps(state) {
    	return Object.assign({}, state);
    }
)(App);

ReactDOM.render(
	<Provider store={store}>
	    <Wrapper />
	</Provider>,
    document.getElementById('main')
);


var width = 1200;
var height = 1200;


function getCoordinateData(coordinateValue, cb) {

	$.get("api/search/?coordinates=" + coordinateValue, function(data) {

		cb(null, data);

	});


};


function findSystem(systemName, cb) {

	$.get("api/search/?system=" + systemName, function(data) {

		var SystemFound = data[0];

		cb(null, data);

	});

};


var dataPaneActive = false;
var populationActive = false;


$("#side-menu-activate").click(function() {

	console.log("Side Menu Activate button has been clicked");

	if(dataPaneActive) {

		var newOpacity = 0.0;
		var newWidth = 0;
		var newDisplay = 'none';

	} else {

		var newOpacity = 0.80;
		var newWidth = "70%";
		var newDisplay = 'block';

	}

	$("#planet-data-container").css("opacity", newOpacity);
	$("#planet-data-container").css("width", newWidth);
	$("#planet-data-container").css("display", newDisplay);

	dataPaneActive =  (dataPaneActive)? false : true;

});




$("#total-planets").click(function() {

	$.get('api/all', function(data) {


		console.log("data: ", data);
	});

});


$("#close-coordinate-display").click(function() {

	$("#planet-data-container").css("opacity", 0.0);
	$("#planet-data-container").css("width", 0);
	$("#planet-data-container").css("display", 'none');


	dataPaneActive =  (dataPaneActive)? false : true;

});


$("#search-system-input").keypress(function(data) {

	// console.log("system input: ", data.key);

	// console.log("keyCode: ", data.keyCode);

	var systemSearch = $("#search-system-input").val();

	if(data.keyCode === 13) {

		findSystem(systemSearch, function(error, result) {

			console.log("system found: ", result[0]);

		});

	}

});


$("#search-system").click(function(data) {

	// console.log("system input: ", data.key);

	var systemSearch = $("#search-system-input").val();
	// console.log("systemSearch: ", systemSearch);

	findSystem(systemSearch, function(error, result) {

		console.log("system found: ", result);

	});

});


// Red  (Hex: #FF0000) (RGB: 255, 0, 0)  > 80
// Ornange-ish Red (Hex: #E2571E) (RGB: 226, 87, 30) > 70
// Orange (Hex: #FF7F00) (RGB: 255, 127, 0) > 60
// Yellow  (Hex: #FFFF00) (RGB: 255, 255, 0) > 50
// Green  (Hex: #00FF00) (RGB: 0, 255, 0) > 40
// Some Green (Hex: #96bf33) (RGB: 150, 191, 51) > 30
// Blue (Hex: #0000FF) (RGB: 0, 0, 255) > 20
// Indigo (Hex: #4B0082) (RGB: 75, 0, 130) > 10
// Violet  (Hex: #8B00FF) (RGB: 139, 0, 255) > 5
// White   (Hex: #ffffff) (RGB: 255, 255, 255) > 0



console.log("jQuery status: ", $ === jQuery);

console.log("d3: ", d3);

