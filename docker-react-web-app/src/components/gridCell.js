import React from 'react';
import { Provider, connect } from 'react-redux';
import { displaySystems } from '../actions/mapActions.js';



var GridRectangle = {
  fill: "none",
  stroke: "#49fb35",
  opacity: 0.1,
  strokeWidth: 1
};


var GridRectangleMouseover = {
  /*fill-opacity: 1.0;*/
  opacity: 0.5,
  strokeWidth: 5,
  /*stroke: #FF851B;*/
  stroke: "teal",
  cursor: "pointer"
};

var GridBorder = {
  backgroundColor: "black",
  stroke: "#49fb35",
  strokeWidth: 1,
  opacity: 1.0
};

var HoverMixin = {

    // Initial state
    componentWillMount: function() {
      this.state = { hovered: false };
    },
    
    // Attach mouse listeners to the root node of the component
    componentDidMount: function() {
      this.getDOMNode().addEventListener("mouseover", this.onMouseOver);
      this.getDOMNode().addEventListener("mouseout", this.onMouseOut);
    },
    
    // Clean up listeners when the component unmounts
    componentWillUnmount: function() {
      this.getDOMNode().removeEventListener("mouseover", this.onMouseOver);
      this.getDOMNode().removeEventListener("mouseout", this.onMouseOut);
    },
    
    // Mutate state
    onMouseOver: function() {
      this.setState({ hovered: true });
    },
    
    onMouseOut: function() {
      this.setState({ hovered: false });
    }
};




class GridCell extends React.Component {

  constructor() {
    super();
    this.state = {
      hover: false,
      style: {},
      planets: null
    };

  }

  componentWillReceiveProps(newProps) {

    // console.log("newProps: ", newProps);
 
    if(newProps.population && this.state.planets === null) {

      getCoordinateData(this.props.coordinates, (error, result) => {


          if(!error) {

            if(result.length > 0) {

              var TempCellStyle = getCellStyle(this.props.coordinates, result.length);
              this.setState({style: TempCellStyle});
              this.setState({planets: result.length});

              // console.log("TempCellStyle: ", TempCellStyle);

            } else {

              this.setState({planets: 0});

            }

          } else {


          }

      });

     }

      if(newProps.population && this.state.planets > 0) {

        var TempCellStyle = getCellStyle(this.props.coordinates, this.state.planets);
        this.setState({style: TempCellStyle});

      }
  }

  gridClick() {

    console.log("Grid clicked coordinates: ", this.props.coordinates);

    getCoordinateData(this.props.coordinates, (error, result) => {

      if(result.length > 0) {

        console.log("this: ", this);

        var dispatchBS = displaySystems(result);

        console.log("dispatchBS: ", dispatchBS);

        console.log("result: ", result);


        this.props.dispatch({ type: 'SYSTEMS_ON'});
        this.props.dispatch({ type: 'DISPLAY_SYSTEMS', payload: result });

        console.log("this.props: ", this.props);

        // $.each(result, function(i, n) {

        //   console.log(n);


        // });

        console.log("number of planets: ", result.length);

      }

    });


  }

  toggleHover() {

    this.setState({hover: !this.state.hover})
  }

  onMouseOver(e) {

    this.setState({hover: true});

    console.log("\nMouse Over coordinates: ", this.props.coordinates);


  }

  onMouseOut(e) {

    // console.log("\nMouse Out coordinates: ", this.props.coordinates)

    // console.log("hover before: ", this.state)

  }

  onMouseEnter(e) {

    this.setState({hover: true});


    console.log("\nMouse Enter coordinates: ", this.props.coordinates);
  }

  onMouseLeave(e) {

    // console.log("\nMouse Leave coordinates: ", this.props.coordinates);
    this.setState({hover: false});
  }

  onMouseOverText(e) {
    // console.log("\nMouse Over text: ", this.props.coordinates)
  }

  onMouseOutText(e) {
    // console.log("\nMouse Out text: ", this.props.coordinates)
  }

  render() {
    var GridCellStyle;
    var textStyle;
    var containerStyle;


    if(this.props.gridBorder) {
      textStyle = {opacity: 0.75};
    } else {
      textStyle = {opacity: 0.0}
    }

    if(this.state.hover && !this.props.gridBorder) {
      GridCellStyle = GridRectangleMouseover;
      textStyle = {opacity: 1.0, cursor: "pointer"};
    } else if (!this.props.gridBorder) {
      GridCellStyle = GridRectangle;
      textStyle = {opacity: 0.0};
    } else if (this.props.gridBorder) {
      GridCellStyle = GridBorder;
      textStyle = {opacity: 1.0};

    }

    if(!this.props.gridBorder && this.props.population) {

      var UpdatedGridCellStyle = _.clone(GridCellStyle, true);

      _.merge(UpdatedGridCellStyle, this.state.style);

      GridCellStyle = UpdatedGridCellStyle;

    } else if(!this.props.gridBorder && !this.props.population) {

      GridCellStyle.fill = 'none';

    }

    return (  
      <svg onClick={(e) => this.gridClick(e)} onMouseOver={(e) => this.onMouseOver(e)} onMouseOut={(e) => this.onMouseOut(e)}  onMouseLeave={(e) => this.onMouseLeave(e)} >
        <g>
          <rect style={GridCellStyle}  x={this.props.x} y={this.props.y} height={this.props.height} width={this.props.width} onMouseEnter={(e) => this.onMouseEnter(e)} >

          </rect>

          <text className="grid-text" style={textStyle}  x={this.props.xText} y={this.props.yText} height={this.props.heightText} width={this.props.widthText}>{this.props.text}</text>
        </g>
      </svg>
    );
  }
}



function getCoordinateData(coordinateValue, cb) {

  $.get("api/search/?coordinates=" + coordinateValue, data => {

    cb(null, data);

  });

};


function getPopulatedAreas(cb) {

  $.get("api/populated-areas", data => {

    console.log("Number of populated Coordinate Zones: ", data.length);
    cb(null, data);

  });

};


var RainbowCss = [
  {
    color: "red",
    hex: "#FF0000",
    planetMin: 80
  },
  {
    color: "redOrange",
    hex: "#E2571E",
    planetMin: 70
  },
  {
    color: "orange",
    hex: "#FF7F00",
    planetMin: 60
  },
  {
    color: "yellow",
    hex: "#FFFF00",
    planetMin: 50
  },
  {
    color: "green",
    hex: "#00FF00",
    planetMin: 40
  },
  {
    color: "blueGreen",
    hex: "#96BF33",
    planetMin: 30
  },
  {
    color: "blue",
    hex: "#0000FF",
    planetMin: 20
  },
  {
    color: "indigo",
    hex: "#4B0082",
    planetMin: 10
  },
  {
    color: "violet",
    hex: "#8B00FF",
    planetMin: 5
  },
  {
    color: "white",
    hex: "#ffffff",
    planetMin: 0
  }
];





function getCellStyle(coordinateValue, numberOfPlanets) {

  if(numberOfPlanets <= 0) {

    return {};

  } else {

    var mostPopulatedCoordinateValue = 0;

    if(numberOfPlanets > mostPopulatedCoordinateValue) {

      mostPopulatedCoordinateValue = numberOfPlanets;

    }

    var planetDensity = ((numberOfPlanets / 131) * 0.4) + 0.1;
    var planetDensityColorValue = parseInt((numberOfPlanets / 131.0) * 100);
    var testValue = $.grep(RainbowCss, function(n, i) {

      return numberOfPlanets > n.planetMin;

    });

    var PlanetPopColor = _.maxBy(testValue, "planetMin");

    return {
      'fill': PlanetPopColor.hex,
      'opacity': 0.5
    };

  }


};


const mapStateToProps = (state = {}) => {
    return Object.assign({}, state);
};


export default connect(mapStateToProps)(GridCell);
