import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';


class AttractionsPage extends Component {

    
    state = {
        heading: 'Class Component',
    };

    componentDidMount = () => { 
        const { id } = this.props.match.params;
        console.log('id', id);
        // get the one park chosen
        this.props.dispatch({type: 'GET_SINGLE_PARK', payload: id});
        // get the attractions at the chosen park
        this.props.dispatch({type: 'GET_ATTRACTIONS', payload: id});
    }

    render() {
        const { id } = this.props.match.params;
        return (
            <div>
                <h3>parks id is {id} </h3>
                <ul>
                    {/* put list of attractions here */}
                </ul>
            </div>
        );
    }
}

export default connect(mapStoreToProps)(AttractionsPage);
