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

    	<div className={this.props.map ? '' : 'hidden'}>
      		<img className='map-image' height="1200" width="1200" src={galaxy} alt={"galaxy"} />
      	</div>
    );
  }
}



const mapStateToProps = (state = {}) => {
    return Object.assign({}, state);
};


export default connect(mapStateToProps)(MapImage);

