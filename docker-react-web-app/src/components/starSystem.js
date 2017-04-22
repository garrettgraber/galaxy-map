

import React from 'react';
import ReactFauxDOM from 'react-faux-dom';
import {coordinateArray} from '../data/stellarCoordinates.js'
import { connect } from 'react-redux';

import styles from '../css/main.css'

class StarSystem extends React.Component {
  constructor() {
    super();
    this.state = {
    	hover: false
    }
  }

  onMouseOver(e) {

    console.log("Mouse over star!");
    this.setState({hover: true});


  }

  onMouseLeave(e) {

    // console.log("\nMouse Leave coordinates: ", this.props.coordinates);
    console.log("Mouse has left star!");

  }

  onMouseOut(e) {

  	console.log("Mouse out has happened!");
  	this.setState({hover: false});


  }

  starClick(e) {

  	console.log("star clicked: ", e);


  }

  render() {

  	// console.log("props.starSystem: ", this.props);

  	// var CurrentLocation = galacticToMapCoordinate(this.props.x, this.props.y);

  	if(this.state.hover) {
  		var textStyle = {fontSize: textSize(this.props.zoomLevel), fill: "red"};
  	} else {
  		var textStyle = {display: "none", fontSize: textSize(this.props.zoomLevel), fill: "red"};
  	}

    return (
    	<svg onClick={(e) => this.starClick(e)} onMouseOver={(e) => this.onMouseOver(e)} onMouseOut={(e) => this.onMouseOut(e)}  onMouseLeave={(e) => this.onMouseLeave(e)} >
    		<g>
	    		<text x={this.props.xText} y={this.props.yText}  style={textStyle}>{this.props.name}</text>
	    		<circle style={ {fill: "red"} } r={starRadius(this.props.zoomLevel)} className={styles.starCircle} cx={this.props.x}  cy={this.props.y} />
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




function starRadius(zoomValue) {

	if(1.0 <= zoomValue && zoomValue <= 5.0) {

		console.log("zoomValue: ", zoomValue);
		var newRadius = 2.0 - ((zoomValue - 1) * 0.25);

	} else if (5.0 < zoomValue && zoomValue <= 10.0) {

		console.log("zoomValue: ", zoomValue);
		var newRadius = 1.0 - ((zoomValue - 5.0) / 10.0);

	} else if (10.0 < zoomValue && zoomValue <= 20.0) {

		console.log("zoomValue: ", zoomValue);

		var newRadius = 0.5 - ((zoomValue - 10.0) / 40.0);

	} else if (zoomValue > 20.0) {

		console.log("zoomValue: ", zoomValue);

		var newRadius = 0.25;

	}

	return newRadius;
}



function textSize(zoomValue) {

	if(1.0 <= zoomValue && zoomValue <= 2.0) {

		var newTextSize = 11 - ((zoomValue - 1.0) * 3);

	} else if(2.0 < zoomValue && zoomValue <= 3.0) {

		var newTextSize = 8 - ((zoomValue - 2.0) * 2);

	} else if(3.0 < zoomValue && zoomValue <= 4.0) {

		var newTextSize = 6 - ((zoomValue - 3.0) * 1);

	} else if(4.0 < zoomValue && zoomValue <= 5.0) {

		var newTextSize = 5 - ((zoomValue - 4.0) * 0.5)

	} else if(5.0 < zoomValue && zoomValue <= 7.5) {

		var newTextSize = 4.5 - ((zoomValue - 5.0) * 0.5);

	} else if(7.5 < zoomValue && zoomValue <= 10.0) {

		var newTextSize = 3.25 - ((zoomValue - 7.5) * 0.5);

	} else if(10.0 < zoomValue && zoomValue <= 20.0) {

		var newTextSize = 2.0 - ((zoomValue - 10.0) * 0.1);

	} else if(zoomValue > 20.0) {

		var newTextSize = 1.0;

	}

	return newTextSize.toString() + "px";
}




const mapStateToProps = (state = {}) => {
    return Object.assign({}, state);
};

export default connect(mapStateToProps)(StarSystem);
