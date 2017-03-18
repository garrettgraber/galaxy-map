import React from 'react';
import { connect } from 'react-redux';
import SearchData from './searchData.js';


class NavBar extends React.Component {
	toggleGrid() {
    	console.log("grid clicked" );
    	console.log("this.props: ", this.props);
    	this.props.dispatch({ type: 'TOGGLE GRID' });    
    }

    toggleRegions() {
    	console.log("regions clicked");
    	console.log("this.props: ", this.props);
    	this.props.dispatch({ type: 'TOGGLE REGIONS' });    

    }

    toggleStars() {
    	console.log("stars clicked");
    	console.log("this.props: ", this.props);
    	this.props.dispatch({ type: 'TOGGLE STARS' });
    }

    toggleMap() {
    	console.log("map clicked");
    	console.log("this.props: ", this.props);
    	this.props.dispatch({ type: 'TOGGLE MAP IMAGE' });
    }

    togglePopulation() {

    	console.log("population clicked");
    	console.log("this.props: ", this.props);
    	this.props.dispatch({ type: 'TOGGLE POPULATION' });

    }

	render() {

        console.log("this.props in nav: ", this.props);
        var populationStyle = {};

        if(!this.props.grid) {
            var populationStyle = {display: 'none'};
        }

        

    	return (
            <div id="nav-container">
            	<div className="nav-section">
    		   		<button id="total-planets" type="button" className="btn btn-primary navbar-button" >Total Planets</button>
                    <SearchData/>
                </div>
                <div className="nav-section">
                    <span style={ {color: "#49fb35"} }>MAP CONTROLS:&nbsp;&nbsp;</span>
                    <button id="galaxy-image-active" onClick={(e) => this.toggleMap(e)}  type="button" className={buttonOn(this.props.map)}>Galaxy Image</button>
                    
                    <button id="regions-overlay" onClick={(e) => this.toggleRegions(e)} type="button" className={buttonOn(this.props.regions)}>Regions</button>
                    <button id="stars-overlay" onClick={(e) => this.toggleStars(e)} type="button" className={buttonOn(this.props.stars)}>Stars</button>
                    <button id="grid-controller" onClick={(e) => this.toggleGrid(e)} type="button" className={buttonOn(this.props.grid)}>Grid</button>
                    <button id="population-density" onClick={(e) => this.togglePopulation(e)}  type="button" className={buttonOn(this.props.population)}  style={ populationStyle }>Population</button>
                </div>
            </div>

        );
    }
}


// <button id="search-system" type="button" className="btn btn-primary navbar-button" style={  {marginRight: 10} }>Planet Search&nbsp;&nbsp;</button>
                    
//                     <input id="search-system-input" type="text" />


function buttonOn(buttonStatus) {
    if(buttonStatus) {
        return "btn btn-success navbar-button";

    } else {
        return "btn btn-danger navbar-button";
    }
}


const mapStateToProps = (state = {}) => {
    return Object.assign({}, state);
};


export default connect(mapStateToProps)(NavBar);

