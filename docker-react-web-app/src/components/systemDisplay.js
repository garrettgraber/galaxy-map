import React from 'react';
import ReactFauxDOM from 'react-faux-dom';
import { connect } from 'react-redux';


import SystemData from './systemData.js';


class SystemDisplay extends React.Component {
  constructor() {
    super();
  }


  componentWillReceiveProps(newProps) {
 
  	console.log("newProps systems: ", newProps);
  	// generateSystemsDisplay(newProps.currentSystems);

  }

  closeDisplay(e) {

    this.props.dispatch({ type: 'SYSTEMS_OFF'});

  }



  render() {
  	console.log("props.systems: ", this.props);
    var displayStyle = {display: (this.props.systems)? 'block' : 'none'};

    return (
      	<div id="planet-data" style={displayStyle}>
          <div style={ {width: "280px", marginBottom: "6px" } }>
            <div style={ {position: "fixed", opacity: 1.0, color: "#49fb35", backgroundColor: "black", width: "280px", height: "40px", borderBottom: "2px solid white", borderRight: "2px solid white"} }>
              <span>Current Number of Systems: </span>
              <span>{this.props.currentSystems.length}</span>
              <button style={ {width: "40px", height: "40px", backgroundColor: "black", color: "#49fb35", position: "relative", float: "right"} }  onClick={(e) => this.closeDisplay(e)} >X</button>
            </div>
            <div style={ {overflow: "hidden", paddingTop: "40px"} }>
        		  {generateSystemsDisplay(this.props.currentSystems)}
            </div>
          </div>
  		  </div>
    );
  }
}


function generateSystemsDisplay(systemArray) {

  var systemsArrayReactElements = [];

	for(var i=0; i < systemArray.length; i++) {

		var currentSystem = systemArray[i];

    systemsArrayReactElements.push(<SystemData  system={currentSystem.system} region={currentSystem.region} sector={currentSystem.sector}  coordinates={currentSystem.coordinates} />);

	}

  console.log("systemsArrayReactElements: ", systemsArrayReactElements);

  return systemsArrayReactElements;
}

const mapStateToProps = (state = {}) => {
    return Object.assign({}, state);
};


export default connect(mapStateToProps)(SystemDisplay);

