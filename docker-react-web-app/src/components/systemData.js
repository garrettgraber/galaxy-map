import React from 'react';
import ReactFauxDOM from 'react-faux-dom';
// import { connect } from 'react-redux';


class SystemData extends React.Component {
  constructor() {
    super();
  }

  wookiepeidiaLink(systemName) {

    var url = 'http://starwars.wikia.com/wiki/' + systemName.replace(/ /g,"_");

    return url;
    
  }

  wookiepeidiaLinkSystem(systemName) {

    var url = 'http://starwars.wikia.com/wiki/' + systemName.replace(/ /g,"_") + '_system';

    return url;
    
  }

  wookiepeidiaLinkSector(sectorArray) {
    
    var sectorLinksArray = [];

    for(var i=0; i < sectorArray.length; i++) {

      var currentSecton = sectorArray[i];

      var url = 'http://starwars.wikia.com/wiki/' + currentSecton + "_sector";

      sectorLinksArray.push(<a href={url} target={"_blank"}>{currentSecton}</a>);

    }

    return sectorLinksArray;
  }

  wookiepeidiaLinkRegion(regionString) {

    var url = 'http://starwars.wikia.com/wiki/' + regionString.replace(/ /g,"_") + "/Legends";

    return url;
  }


  render() {

    // console.log("this.props system data: ", this.props);

    return (
      <div>
    		<div style={ {color: "#49fb35"} }>
          <span>&nbsp;&nbsp;Planet:&nbsp;&nbsp;</span>
          <a target="_blank" href={this.wookiepeidiaLink(this.props.system)}>{this.props.system}</a>&nbsp;&nbsp;
        </div>
        <div style={ {color: "#49fb35"} }>
          <span>&nbsp;&nbsp;System:&nbsp;&nbsp;</span>
          <a target="_blank" href={this.wookiepeidiaLinkSystem(this.props.system)}>{this.props.system}&nbsp;&nbsp;system</a>
        </div>

        <div style={ {color: "#49fb35"} }><span>&nbsp;&nbsp;Sector:&nbsp;&nbsp;</span>
          {this.wookiepeidiaLinkSector(this.props.sector)}            
        </div>
        <div style={ {color: "#49fb35"} }>
          <span>&nbsp;&nbsp;Region:&nbsp;&nbsp;</span>
          <a target="_blank" href={this.wookiepeidiaLinkRegion(this.props.region)}>{this.props.region}</a>&nbsp;&nbsp;
        </div>
        <div style={ {color: "#49fb35"} }><span>&nbsp;&nbsp;Coordinates:&nbsp;&nbsp;</span><span>{this.props.coordinates}</span></div>
        <br />
      </div>
    );
  }
}


// const mapStateToProps = (state = {}) => {
//     return Object.assign({}, state);
// };


// <a target="_blank" href={this.wookiepeidiaLinkSector(this.props.sector)}>{this.props.sector}</a>



export default SystemData;