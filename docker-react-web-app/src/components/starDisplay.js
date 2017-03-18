import React from 'react';
import ReactFauxDOM from 'react-faux-dom';
import { connect } from 'react-redux';


import SystemData from './systemData.js';


class StarDisplay extends React.Component {
  constructor() {
    super();
  }


  componentWillReceiveProps(newProps) {
 
  	console.log("newProps systems: ", newProps);
  	// generateSystemsDisplay(newProps.currentSystems);

  }

  closeStarDisplay(e) {

    // this.props.dispatch({ type: 'SYSTEMS_OFF'});

  }



  render() {
  	console.log("props.star display: ", this.props);
    var displayStyle = {display: (this.props.starDisplay)? 'block' : 'none'};

    return (
      	<div id="star-display" style={displayStyle}>
          <div style={ {display: 'inline-block', width: 520, height: 520, borderRight: '2px solid white'} }>
            <svg width={520}  height={520}>
              { generateStarDisplay() }
            </svg>
          </div>
          <div style={ {display: 'inline-block', width: 100, height: 560 } }>
          </div>
  		  </div>
    );
  }
}


function generateStarDisplay() {

  var starArrayReactElements = [];

	for(var i=1; i <= 12; i++) {

    for(var j=1; j <= 12; j++) {

      starArrayReactElements.push(<circle style={{stroke: "black", fill: "red"}} r={4} cx={40 * i} cy={40 * j}/>);


    }


	}

  console.log("starArrayReactElements: ", starArrayReactElements);

  return starArrayReactElements;
}

const mapStateToProps = (state = {}) => {
    return Object.assign({}, state);
};


export default connect(mapStateToProps)(StarDisplay);

