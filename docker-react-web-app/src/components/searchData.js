import React from 'react';
import ReactFauxDOM from 'react-faux-dom';
import { connect } from 'react-redux';


class SearchData extends React.Component {
  constructor() {
    super();
    this.state = { inputValue: '' };
    this.change = (e) => {

      console.log("e.target.value: ", e.target.value);
      console.log("this: ", this);

      this.setState({inputValue: e.target.value});
    };
  }


  render() {

    console.log("this.props system data: ", this.props);

    return (
      <span>
        <button id="search-system" type="button" className="btn btn-primary navbar-button" style={  {marginRight: 10} }>Planet Search&nbsp;&nbsp;</button>
        <input id="search-system-input" type="text" value={this.state.inputValue}  onChange={this.change}/>
      </span>
    );
  }
}


const mapStateToProps = (state = {}) => {
    return Object.assign({}, state);
};


// <a target="_blank" href={this.wookiepeidiaLinkSector(this.props.sector)}>{this.props.sector}</a>



export default SearchData;