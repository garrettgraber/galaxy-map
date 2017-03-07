import React from 'react';
import GridCell from './gridCell.js';
import { Provider, connect } from 'react-redux';


const generateGridCell = (populationOn, populatedCoordinates = []) => {

	console.log("populatedCoordinates: ", populatedCoordinates);

	var totalPopulatedCoordinates = 0;
	var gridCells = [];
	var foundCoordinates = [];
	var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXZ";
	var galacticCoreOffset = 18;
	var width = 1200;
	var height = 1200;
	var squareLength = 48;
	var gridStart = squareLength + galacticCoreOffset;
	var gridEnd = width + galacticCoreOffset - squareLength;

	for(var i=gridStart; i < gridEnd; i= i + squareLength) {

		var currentColumn = ((i - galacticCoreOffset) / squareLength);
		var currentColumnLabel = alphabet.slice(currentColumn - 1, currentColumn);

		for (var j=0; j <= height - squareLength; j= j + squareLength) {

			var currentRow = (j / squareLength);
			var actualLabel = currentColumnLabel + "-" + currentRow;

			if(currentRow === 0 || currentRow === 24) {
				var currentRowValue = currentColumnLabel;
			} else if ( (currentColumn === 1 || currentColumn === 23) && currentRow !== 0 && currentRow !== 24) {
				var currentRowValue = currentRow;	
			} else {
				var currentRowValue = currentColumnLabel + "-" + currentRow;
			}

			var xText = i + 12;
			var yText = j + (squareLength / 2 + 3);
			var widthText = squareLength + 8;
			var heightText = squareLength;

			if(currentRow === 0 || currentColumn === 1 || currentColumn === 23 || currentRow === 24) {

				var borderValue = true;

			} else {

				var borderValue = false;

			}

			var currentGridLocation = currentColumnLabel + "-" + currentRow;



			var populatedCoordinatesFound = $.grep(populatedCoordinates, function(n, i) {

				return n.coordinates === currentGridLocation;

			});


			if(populatedCoordinatesFound.length > 0) {

				totalPopulatedCoordinates++;
				foundCoordinates.push(currentGridLocation);

				var systemFoundInPopulated = true; 

			} else {

				var systemFoundInPopulated = false;

			}



			gridCells.push(<GridCell x={i} y={j} width={squareLength} height={squareLength} xText={xText} yText={yText} heightText={squareLength} widthText={squareLength + 8} text={currentRowValue}  coordinates={currentGridLocation} gridBorder={borderValue} population={populationOn}  totalSystems={0}/>)

		}

	}

	var populatedCoordinatesArray = [];

	for(var k=0; k < populatedCoordinates.length; k++) {

		var currentCoordinates = populatedCoordinates[k];
		populatedCoordinatesArray.push(currentCoordinates.coordinates);

	}

	console.log("gridCells: ", gridCells);
	console.log("foundCoordinates: ", foundCoordinates);
	console.log("populatedCoordinatesArray: ", populatedCoordinatesArray);

	console.log("populatedCoordinates: ", populatedCoordinates);

	var hiddenCoordinates = _.difference( populatedCoordinatesArray, foundCoordinates);

	console.log("hiddenCoordinates: ", hiddenCoordinates);

	console.log("totalPopulatedCoordinates: ", totalPopulatedCoordinates);

	return gridCells;
}


class Grid extends React.Component {
  constructor(props) {
    super(props);
    console.log("Grid props: ", props);
    this.state = {populatedCoordinates: []};

  }

  componentDidMount() {

  	console.log("Grid componentDidMount: ", this);

	$.ajax({
		url: "api/populated-areas",
		dataType: 'json',
		cache: true,
		success: function(data) {

			console.log("data: ", data);		
		  this.setState({populatedCoordinates: data});

	}.bind(this),

		error: function(xhr, status, err) {

		}.bind(this)
	});
  }



  render() {

  	var gridStyle = {};
  	var gridOverallStyle = "map-area";

  	if(!this.props.grid) {
  		gridOverallStyle = "map-area" + " hidden";
  	}

    return (
		<div id='grid' className={gridOverallStyle}>
			<svg  id="grid-component" className="map-area"  width={this.props.width} height={this.props.height} style={gridStyle}>{generateGridCell(this.props.population, this.state.populatedCoordinates)}
			</svg>
	    </div>
    );
  }
}


// /**
//  * Map the state to props.
//  */
// const mapStateToProps = (state) => ({
//   ...state
// });

// /**
//  * Map the actions to props.
//  */
// const mapDispatchToProps = (dispatch) => ({
//   actions: bindActionCreators(Actions, dispatch)
// });

// /**
//  * Connect the component to
//  * the Redux store.
//  */
// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(Grid);



function getPopulatedAreas(cb) {

	$.get("api/populated-areas", data => {

		console.log("Number of populated Coordinate Zones: ", data.length);

		cb(null, data);

	});

};


function getCoordinatesArray(populatedCoordinates) {

	var populatedCoordinatesArray = [];

	for(var k=0; k < populatedCoordinates.length; k++) {

		var currentCoordinates = populatedCoordinates[k];
		populatedCoordinatesArray.push(currentCoordinates.coordinates);

	}
}

function getCoordinateData(coordinateValue, cb) {

	$.get("api/search/?coordinates=" + coordinateValue, data => {

		cb(null, data);

	});


};



const mapStateToProps = (state = {}) => {
    return Object.assign({}, state);
};


export default connect(mapStateToProps)(Grid);
