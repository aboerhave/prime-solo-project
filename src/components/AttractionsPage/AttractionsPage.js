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
        // get favorite attractions for user
        this.props.dispatch({type: 'GET_FAVORITES'});
    }

    render() {
        const { id } = this.props.match.params;
        return (
            <div>
                <h3>parks id is {id} </h3>
                <h3>{this.props.store.singlePark.name}</h3>
                <ul>
                    {/* put list of attractions here */}
                    {this.props.store.attractions.map((attraction) => {
                        return(
                            <li key={attraction.id} >
                                {attraction.name}
                                <button>🤍</button>
                                <button>🧡</button>
                            </li>
                        )
                    })}
                </ul>
            </div>
        );
    }
}

export default connect(mapStoreToProps)(AttractionsPage);
