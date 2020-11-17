import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { Link } from 'react-router-dom';


class ParksPage extends Component {

    componentDidMount = () => {
        // need to make get request to get data of list of parks here
        this.getParks();
    }

    getParks = () => {
        this.props.dispatch({type: 'GET_PARKS'});
    }

    getAttractions = (event, parkId) => {
        console.log('clicked with parkId', parkId);
        
    }

    render() {
        return (
            <>
            {/* {JSON.stringify(this.props.store.parks)} */}
            <ul>
                {this.props.store.parks.map((park) => {
                    return (
                        <li key={park.id} >
                            {/* <Link to="/attractions" onClick={(event)=>this.getAttractions(event, park.id)}> */}
                            <Link to={`/attractions/${park.id}`} >
                                
                                {park.name}
                            </Link>
                        </li>
                    )
                })}
            </ul>
            </>
        );
    }
}

export default connect(mapStoreToProps)(ParksPage);
