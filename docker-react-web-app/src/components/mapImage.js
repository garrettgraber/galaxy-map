import React from 'react';
import galaxy from '../images/galaxy-image.jpg';
import { connect } from 'react-redux';


console.log("galaxy: ", galaxy);

class MapImage extends React.Component {
  constructor() {
    super();
  }

  render() {
  	  	console.log("props.map: ", this.props);

    return (
    	<g className={this.props.map ? 'map-area' : 'map-area + hidden'}>
    		<image className='map-image' height={1200} width={1200} xlinkHref={galaxy} alt={"galaxy"} />
    	</g>
    );
  }
}



const mapStateToProps = (state = {}) => {
    return Object.assign({}, state);
};


export default connect(mapStateToProps)(MapImage);

