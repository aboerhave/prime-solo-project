import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';


class AttractionsPage extends Component {
    state = {
        heading: 'Class Component',
    };

    render() {
        return (
            <div>
                <h2>{this.state.heading}</h2>
                {this.props.params}
            </div>
        );
    }
}

export default connect(mapStoreToProps)(AttractionsPage);
