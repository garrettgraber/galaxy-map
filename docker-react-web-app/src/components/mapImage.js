import React from 'react';
import galaxy from '../images/galaxy-image.jpg';
import { connect } from 'react-redux';

class MapImage extends React.Component {
  constructor() {
    super();
  }

  render() {
  	  	console.log("props.map: ", this.props);

    return (
    	<div id="image-container" className={this.props.map ? 'map-area' : 'map-area + hidden'}>
      		<img className='map-image' height="1200" width="1200" src={galaxy} alt={"galaxy"} />
      	</div>
    );
  }
}



const mapStateToProps = (state = {}) => {
    return Object.assign({}, state);
};


export default connect(mapStateToProps)(MapImage);

