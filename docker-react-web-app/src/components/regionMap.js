import React from 'react';
import ReactFauxDOM from 'react-faux-dom';
import { connect } from 'react-redux';


class RegionMap extends React.Component {
  constructor() {
    super();
  }

  render() {
  	console.log("props.regions: ", this.props);

    return (
    	<div className={this.props.regions ? '' : 'hidden'}>{generateRegions()}</div>
    );
  }
}


function generateRegions() {

	var regionMapGalaxyElement = ReactFauxDOM.createElement('svg');

	d3.select(regionMapGalaxyElement)
		.attr("id", "")
	    .attr("width", 1200)
	    .attr("height", 1200);


	var coloniesRegionElement = createGalacticCoreRegion(132 + 2, "#6495ED");
	var coreWorldsRegionElement = createGalacticCoreRegion(92 + 8, "#FF8C69");
	var deepCoreRegionElement = createGalacticCoreRegion(56 + 2, "teal");

	regionMapGalaxyElement.appendChild(coloniesRegionElement);
	regionMapGalaxyElement.appendChild(coreWorldsRegionElement);
	regionMapGalaxyElement.appendChild(deepCoreRegionElement);

	return regionMapGalaxyElement.toReact();

};


function createGalacticCoreRegion(distanceFromCore, fillColor) {

	var regionMapElement = ReactFauxDOM.createElement('circle');

	d3.select(regionMapElement)
		.style("opacity", 0.5)
		.style("stroke", "black")
		.style("fill", fillColor)
		.attr("r", distanceFromCore)
		.attr("cx", 594)
		.attr("cy", 552);

	return regionMapElement;
};


const mapStateToProps = (state = {}) => {
    return Object.assign({}, state);
};


export default connect(mapStateToProps)(RegionMap);

