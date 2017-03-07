

import React from 'react';
import ReactFauxDOM from 'react-faux-dom';
import {coordinateArray} from '../data/stellarCoordinates.js'
import { connect } from 'react-redux';

class StarSystem extends React.Component {
  constructor() {
    super();
  }

  onMouseOver(e) {

    console.log("Mouse over star!");

  }

  onMouseLeave(e) {

    // console.log("\nMouse Leave coordinates: ", this.props.coordinates);
    console.log("Mouse has left star!");

  }

  onMouseOut(e) {

  	console.log("Mouse out has happened!");


  }

  starClick(e) {

  	console.log("star clicked: ", e);


  }

  render() {

  	// console.log("props.starSystem: ", this.props);

  	// var CurrentLocation = galacticToMapCoordinate(this.props.x, this.props.y);

    return (
    	<svg onClick={(e) => this.starClick(e)} onMouseOver={(e) => this.onMouseOver(e)} onMouseOut={(e) => this.onMouseOut(e)}  onMouseLeave={(e) => this.onMouseLeave(e)} >
    		<g>
	    		<text x={this.props.xText} y={this.props.yText}  style={ {fontSize: "11px", fill: "red"} }>{this.props.name}</text>
	    		<circle style={ {stroke: "black", fill: "red"} } r={2} className={"star-circle"} cx={this.props.x}  cy={this.props.y} />
	    	</g>
	   	</svg>
    );
  }
}



   //      .on("mouseover", function() {
			// d3.select(this).style("fill", "aliceblue");
	  //   })
	  //   .on("mouseout", function(){
	  //   	d3.select(this).style("fill", "red");
	  //   });




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
	var mapYTextValue = mapYValue = 6;

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

export default connect(mapStateToProps)(StarSystem);
