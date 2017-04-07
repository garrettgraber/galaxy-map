import React from 'react';
import ReactFauxDOM from 'react-faux-dom';
import { connect } from 'react-redux';

import StarSystem from './starSystem.js';

import {coordinateArray} from '../data/stellarCoordinates.js'

// console.log("StarSystem: ", StarSystem);

class StarMap extends React.Component {
  constructor() {
    super();
    this.state = {starData: coordinateArray};
  }

  componentDidMount() {

  	// console.log("Star componentDidMount: ", this);

	$.ajax({
		url: "api/has-location",
		dataType: 'json',
		cache: true,
		success: function(data) {

			console.log("starData: ", data);		
	  		this.setState({starData: data});

	}.bind(this),

		error: function(xhr, status, err) {

		}.bind(this)
	});
  }

  render() {

  	console.log("props.stars: ", this.props.stars);

    return (
    	generateStarMap(this.props.stars, this.props.zoomLevel, this.state.starData)
    );
  }
}


// <div id="planet-shapes-container" className={this.props.stars ? 'map-area' : 'map-area hidden'}>
// 	<svg id="map-svg" width={1200} height={1200}>
// 	</svg>
// </div>

// <svg id="map-svg" width={1200} height={1200}></svg>

const generateStarMap = (starStatus, zoomLevel, starData) => {

	// var starsArray = [];
	console.log("Total stars: ", starData.length);

	var starMapGalaxyElement = ReactFauxDOM.createElement('svg');

	d3.select(starMapGalaxyElement)
		.attr("id", "map-svg")
	    .attr("width", 1200)
	    .attr("height", 1200)
	    .attr("class", starStatus ? 'map-area' : 'map-area hidden');

	for(var i=0; i < starData.length; i++) {

		var CurrentSystem = starData[i];


		if(CurrentSystem.hasLocation) {

			var GalacticCoordinatesTemp = revertCoordinates(CurrentSystem);
			var CurrentLocation = galacticToMapCoordinate(GalacticCoordinatesTemp.x, GalacticCoordinatesTemp.y);

		} else {

			var CurrentLocation = galacticToMapCoordinate(CurrentSystem.x, CurrentSystem.y);


		}





		// var starSystemElement = createStarSystem(CurrentLocation.x, CurrentLocation.y);
		// var starSystemTextElement = createStarSystemText(CurrentLocation.x, CurrentLocation.y, CurrentSystem.name);

		// starMapElement.appendChild(starSystemElement)
		// starMapElement.appendChild(starSystemTextElement)

		// starsArray.push(<StarSystem  x={CurrentLocation.x}  y={CurrentLocation.y}  name={CurrentSystem.name} xText={CurrentLocation.xText} yText={CurrentLocation.yText} />);

		starMapGalaxyElement.appendChild(<StarSystem  x={CurrentLocation.x}  y={CurrentLocation.y}  name={CurrentSystem.system} xText={CurrentLocation.xText} yText={CurrentLocation.yText} zoomLevel={zoomLevel}/>);



	}

	return starMapGalaxyElement.toReact();

};



// function createStarSystem(mapXValue, mapYValue) {

// 	var starMapElement = ReactFauxDOM.createElement('circle');

// 	d3.select(starMapElement)
//         .style("stroke", "black")
//         .style("fill", "red")
//         .attr("r", 2)
//         .attr("cx", mapXValue)
//         .attr("cy", mapYValue)
// 		.attr("class", "star-circle");

//    //      .on("mouseover", function() {
// 			// d3.select(this).style("fill", "aliceblue");
// 	  //   })
// 	  //   .on("mouseout", function(){
// 	  //   	d3.select(this).style("fill", "red");
// 	  //   });

//     return starMapElement;
// };


// function createStarSystemText(mapXValue, mapYValue, systemName) {

// 	var starMapElementText = ReactFauxDOM.createElement('text');

//     d3.select(starMapElementText)
//     	.attr("x", mapXValue - 15)
//     	.attr("y", mapYValue -6)
//     	.style("font-size", "11px")
//     	.style("fill", "red")
//     	.text(function () { return systemName });

//     return starMapElementText;
// };



function revertCoordinates(CurrentSystemTemp) {

	var x = parseFloat(CurrentSystemTemp.xGalactic) / 125.0;
	var y = parseFloat(CurrentSystemTemp.yGalactic) / 125.0;

	var xNew = Math.round(x);
	var yNew = Math.round(y);

	return {
		x: xNew,
		y: yNew
	};
}



function galacticToMapCoordinate(x, y) {

	var GalacticCenterCoruscant = {
		GalacticCoordinates: {
			x: 0,
			y: 0
		},
		MapCoordinates: {
			x: 594,
			y: 480
		}
	};

	var mapXValue = (4 * x) + GalacticCenterCoruscant.MapCoordinates.x;
	var mapYValue = (-4 * y) + GalacticCenterCoruscant.MapCoordinates.y;
	var mapXTextValue = mapXValue - 15;
	var mapYTextValue = mapYValue - 6;

	return {
		x: mapXValue,
		y: mapYValue,
		xText: mapXTextValue,
		yText: mapYTextValue
	}
};


function sectorToGalacticCoordinates(SystemObject) {

	var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXZ";
	var sectorAlpha = SystemObject.coordinates.split('-')[0];
	var sectorNumeral = SystemObject.coordinates.split('-')[1];

	if(alphabet.indexOf(sectorAlpha) > 0) {

		var sectorAlphaNumber = parseInt(alphabet.indexOf(sectorAlpha));
		var sectorNumeralNumber = parseInt(sectorNumeral);
		var galacticColumn = sectorAlphaNumber - 11;
		var galacticRow = 9 - sectorNumeralNumber;
		var xValueTemp = 12 * galacticColumn + SystemObject.sectorCoordinates.x;
		var yValueTemp = 12 * galacticRow + SystemObject.sectorCoordinates.y;

		return {
			x: xValueTemp,
			y: yValueTemp
		};
	}
};


function getStarData(cb) {

  $.get("api/has-location", (error, data) => {

    cb(error, data);

  });

};


const mapStateToProps = (state = {}) => {
    return Object.assign({}, state);
};

export default connect(mapStateToProps)(StarMap);
