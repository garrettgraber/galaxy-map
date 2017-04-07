
import React from 'react';
import { connect } from 'react-redux';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';







class MapBase extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {

  	// console.log("Grid componentDidMount: ", this);

	// $.ajax({
	// 	url: "api/populated-areas",
	// 	dataType: 'json',
	// 	cache: true,
	// 	success: function(data) {

	// 		// console.log("data: ", data);		
	// 	  this.setState({populatedCoordinates: data});

	// }.bind(this),

	// 	error: function(xhr, status, err) {

	// 	}.bind(this)
	// });

  }



  render() {

  	// console.log("props.grid: ", this.props);

  //   return (
		// <svg id="grid-component" className={gridOverallStyle}  width={this.props.width} height={this.props.height} style={gridStyle}>{generateGridCell(this.props.population, this.state.populatedCoordinates)}
		// </svg>
  //   );

  	const position = [0, 0];

    return (
	    <Map id="map-main" center={position} zoom={2} height={1000} width={1000}>
			<TileLayer
			  url='../map-tiles/{z}/{x}/{y}.png'
			/>
		</Map>
	);


  }
}



const mapStateToProps = (state = {}) => {
    return Object.assign({}, state);
};


export default connect(mapStateToProps)(MapBase);

