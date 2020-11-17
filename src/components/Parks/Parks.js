import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

class Parks extends Component {

    componentDidMount = () => {
        // need to make get request to get data of list of parks here
        this.getParks();
    }

    getParks = () => {
        this.props.dispatch({type: 'GET_PARKS'});
    }

    render() {
        return (
            <>
            {JSON.stringify(this.props.store.parks)}

            </>
        );
    }
}

export default connect(mapStoreToProps)(Parks);
