

import React from 'react';
import ReactFauxDOM from 'react-faux-dom';
import { connect } from 'react-redux';



var DataButtonMouseover = {
  /*fill-opacity: 1.0;*/
  opacity: 0.5,
  // strokeWidth: 5,
  /*stroke: #FF851B;*/
  stroke: "teal",
  backgroundColor: 'black',
  cursor: "pointer",
  fill: "aqua"
};


class DataController extends React.Component {
  constructor() {
    super();
    this.state = {
      hover: false,
      style: {}
    };
  }

 toggleHover() {

    this.setState({hover: !this.state.hover})
  }

  onMouseOver(e) {

    console.log("\nMouse Over DATA");


    this.setState({hover: true});

  }

  onMouseOut(e) {

        console.log("\nMouse Out DATA");


    // console.log("\nMouse Out coordinates: ", this.props.coordinates)

    console.log("hover before: ", this.state)

  }

  onMouseEnter(e) {

        console.log("\nMouse Enter DATA");


    this.setState({hover: true});


    // console.log("\nMouse Enter coordinates: ", this.props.coordinates);
  }

  onMouseLeave(e) {

    console.log("\nMouse Leave DATA");
    this.setState({hover: false});
  }

  dataClick(e) {

  	console.log("data clicked: ", e);

    this.props.dispatch({ type: 'SYSTEMS_TOGGLE'});



  }

  render() {

    var DataButtonStyle = {stroke: "#49fb35", strokeWidth: 1, opacity: 1, backgroundColor: 'black'};
    var DataButtonTextStyle = {fill: "#49fb35", opacity: 1};


    if(this.state.hover) {
      var DataButtonStyle = DataButtonMouseover;
      var DataButtonTextStyle = {fill: "#49fb35", opacity: 1, cursor: "pointer"};
    }


  	// console.log("props.starSystem: ", this.props);

  	// var CurrentLocation = galacticToMapCoordinate(this.props.x, this.props.y);

    return (
      <div className="image-control-pane">
        <svg width={65} height={1200}>
          
          <rect onClick={(e) => this.dataClick(e)} onMouseOver={(e) => this.onMouseOver(e)} onMouseOut={(e) => this.onMouseOut(e)}  onMouseLeave={(e) => this.onMouseLeave(e)} x={0} y={0} width={65} height={48} style={DataButtonStyle}></rect>

          <text  onClick={(e) => this.dataClick(e)} onMouseOver={(e) => this.onMouseOver(e)} onMouseOut={(e) => this.onMouseOut(e)}  onMouseLeave={(e) => this.onMouseLeave(e)}  x={12} y={30} height={20} width={40} style={DataButtonTextStyle}> DATA </text>

        </svg>
      </div>
    );
  }
}


const mapStateToProps = (state = {}) => {
    return Object.assign({}, state);
};

export default connect(mapStateToProps)(DataController);
