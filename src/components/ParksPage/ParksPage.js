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
                <h4 id="welcome">Welcome, {this.props.store.user.username}!</h4>
                <div className="center">
                    <h2>Parks</h2>
                    <h4>Tap a park name to see a list of experiences there</h4>
                    <ul>
                        {this.props.store.parks.map((park) => {
                            return (
                                <li key={park.id} >
                                    <Link to={`/attractions/${park.id}`} className="parkLink">
                                        
                                        <p >
                                            {park.name} - {park.city}, {park.state}
                                        </p>
                                    </Link>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </>
        );
    }
}

export default connect(mapStoreToProps)(ParksPage);
