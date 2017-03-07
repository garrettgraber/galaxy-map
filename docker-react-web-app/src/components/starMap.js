import React from 'react';
import ReactFauxDOM from 'react-faux-dom';
import { connect } from 'react-redux';

import StarSystem from './starSystem.js';

import {coordinateArray} from '../data/stellarCoordinates.js'

console.log("StarSystem: ", StarSystem);

class StarMap extends React.Component {
  constructor() {
    super();
  }

  render() {

  	console.log("props.stars: ", this.props);

    return (
    	<div className={this.props.stars ? '' : 'hidden'}>
    		<svg id="map-svg" width={1200} height={1200}>
				{generateStarMap()}
    		</svg>
    	</div>
    );
  }
}

// <svg id="map-svg" width={1200} height={1200}></svg>

const generateStarMap = () => {

	var starsArray = [];

	// var starMapElement = ReactFauxDOM.createElement('svg');

	// d3.select(starMapElement)
	// 	.attr("id", "map-svg")
	//     .attr("width", 1200)
	//     .attr("height", 1200);


	for(var i=0; i < coordinateArray.length; i++) {

		var CurrentSystem = coordinateArray[i];
		var CurrentLocation = galacticToMapCoordinate(CurrentSystem.x, CurrentSystem.y);




		// var starSystemElement = createStarSystem(CurrentLocation.x, CurrentLocation.y);
		// var starSystemTextElement = createStarSystemText(CurrentLocation.x, CurrentLocation.y, CurrentSystem.name);

		// starMapElement.appendChild(starSystemElement)
		// starMapElement.appendChild(starSystemTextElement)

		starsArray.push(<StarSystem  x={CurrentLocation.x}  y={CurrentLocation.y}  name={CurrentSystem.name} xText={CurrentLocation.xText} yText={CurrentLocation.yText} />);



	}

	return starsArray;
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


const mapStateToProps = (state = {}) => {
    return Object.assign({}, state);
};

export default connect(mapStateToProps)(StarMap);
