import React from 'react';
import { connect } from 'react-redux';



import MapImage from './mapImage.js';
import Grid from './grid.js';
import NavBar from './navBar.js';
import StarMap from './starMap.js';
import RegionMap from './regionMap.js';
import SystemDisplay from './systemDisplay.js';
import DataController from './dataController.js';

// require("css-loader!../css/main.css")

// component
class App extends React.Component {

	render() {

		var width = 1200;
		var height = 1200;

		return (
			<div>

				<NavBar/>

			    <div id="map-container" className="map-area">
			    
					<MapImage/>   
					
					<RegionMap/>

					<StarMap/>

					<Grid width={width} height={height} />

					<div id="image-control">
						<DataController/>
						<div className="image-control-pane-right"></div>
					</div>
					
					<div id="planet-data-container" className="map-area map-fill-area">
					<span>Planet Data</span>
					<button id="close-coordinate-display" type="button" className="btn btn-danger">X</button>
					<div className="selected-coordinate">
						<div className="selected-coordinate-display">
							<svg></svg>
						</div>
					</div>
					<div className="selected-coordinate">
						<div className="selected-coordinate-display">
							<svg></svg>          
						</div>
					</div>
					</div>

					<SystemDisplay/>

			    </div>
		    </div>
        );
    }
}



const mapStateToProps = (state = {}) => {
    return Object.assign({}, state);
};


export default connect(mapStateToProps)(App);

