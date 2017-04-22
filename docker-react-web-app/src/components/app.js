import React from 'react';
import { connect } from 'react-redux';
import {ReactSVGPanZoom, fitToViewer} from 'react-svg-pan-zoom';



import MapImage from './mapImage.js';
import Grid from './grid.js';
import NavBar from './navBar.js';
import StarMap from './starMap.js';
import RegionMap from './regionMap.js';
import SystemDisplay from './systemDisplay.js';
import StarDisplay from './starDisplay.js';
import DataController from './dataController.js';
import galaxy from '../images/galaxy-image.jpg';

import MapBase from './mapBase.js';

import styles from '../css/main.css';


console.log("styles: ", styles.mapImage);



// require("css-loader!../css/main.css")

// component
class App extends React.Component {
	constructor(props, context) {
	    super(props, context);
	    this.Viewer = null;
	    this.state = {
	    	detectWheel: true,
	    	zoomLevel: 1,
	    	zoomActive: false
	    };
	}

	componentDidMount() {
		this.Viewer.fitToViewer();
	}


	handlerChangeValue(value) {

	    // console.debug('onChangeValue', value);
	    // console.log("zoom value level: ", value.a);


	    if(this.state.zoomLevel !== value.a) {

	    	// console.log("Zoom changed to: ", value.a);
	    	this.setState({zoomLevel: value.a});

	    }

	}

	zoomMap() {

		// var newZoomLevel = this.state.zoomLevel + 1;
		// this.setState({zoomLevel: newZoomLevel});

		this.Viewer.zoomOnViewerCenter(1.5);

	}

	getValues() {
		console.log("Values: ", this.Viewer.getValue());
	}

	render() {

		var width = 1200;
		var height = 1200;

		return (
			<div>

				<NavBar/>

			    <div id="map-container">

		       
					<svg id="image-container"  width={width} height={height}>
			    		<MapImage/>
			    		<RegionMap/>
			    		<StarMap zoomLevel={this.state.zoomLevel}/>
			    		<Grid width={width} height={height} zoomLevel={this.state.zoomLevel}/>
					</svg>




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
					<StarDisplay/>
			    </div>

			    <div id="image-control">
					<DataController/>					
				</div>

		    </div>
        );
    }
}



// <svg id="image-container"  width={width} height={height}>
// 	<image className='map-image' height={1200} width={1200} xlinkHref={galaxy} alt={"galaxy"} />
// 	<MapImage/> 
// </svg>


// <RegionMap/>

// <StarMap/>

// <Grid width={width} height={height} />

// <div className="image-control-pane-right"></div>


// <div id="map-control" style={{position: 'fixed', right: 200, top: 250, height: '200px', width: '100px', backgroundColor: 'red', zIndex: 10}}>

// 	<button onClick={(e) => this.zoomMap(e)}>Zoom in</button>
//     <button onClick={event => this.Viewer.fitSelection(40, 40, 200, 200)}>Zoom area 200x200</button>
//     <button onClick={event => this.Viewer.fitToViewer()}>Fit</button>
//     <button onClick={event => this.getValues(event)}>Get Values</button>

// </div>


// <ReactSVGPanZoom width={width} height={height} ref={Viewer => this.Viewer = Viewer}
// 	onChangeValue={value => this.handlerChangeValue(value)}
// 	onClick={event => console.log('click', event.x, event.y, event.originalEvent)}
// 	detectWheel={this.state.detectWheel}
// 	onMouseUp={event => console.log('up', event.x, event.y)}
// 	onMouseDown={event => console.log('down', event.x, event.y)}>

// 	<svg id="image-container"  width={width} height={height}>
// 		<MapImage/>
// 		<RegionMap/>
// 		<StarMap zoomLevel={this.state.zoomLevel}/>
// 		<Grid width={width} height={height} zoomLevel={this.state.zoomLevel}/>
// 	</svg>

// </ReactSVGPanZoom>

const mapStateToProps = (state = {}) => {
    return Object.assign({}, state);
};


export default connect(mapStateToProps)(App);

