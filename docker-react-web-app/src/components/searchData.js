import React from 'react';
import ReactFauxDOM from 'react-faux-dom';
import { connect } from 'react-redux';
import { displaySystems } from '../actions/mapActions.js';



class SearchData extends React.Component {
  constructor() {
    super();
    this.state = { inputValue: '' };
    this.change = (e) => {

      console.log("e.target.value: ", e.target.value);
      this.setState({inputValue: e.target.value});

    };
  }


  searchData() {

    console.log("searchData has been clicked: ", this.state.inputValue);

    findSystem(this.state.inputValue, (error, data) => {

      console.log("data found: ", data);

      if(data.length > 0) {

          this.props.dispatch({ type: 'SYSTEMS_ON'});
          this.props.dispatch({ type: 'DISPLAY_SYSTEMS', payload: data[0] });

      }


    });


  }

  render() {

    return (
      <span>
        <button id="search-system" type="button" className="btn btn-primary navbar-button" style={  {marginRight: 10} }  onClick={(e) => this.searchData(e)}>Planet Search&nbsp;&nbsp;</button>
        <input id="search-system-input" type="text" value={this.state.inputValue}  onChange={this.change}/>
      </span>
    );
  }
}




function findSystem(systemName, cb) {

  $.get("api/search/?system=" + systemName, function(data) {

    var SystemFound = data[0];

    cb(null, data);

  });

};




const mapStateToProps = (state = {}) => {
    return Object.assign({}, state);
};



export default connect(mapStateToProps)(SearchData);
