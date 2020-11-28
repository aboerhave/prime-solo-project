// ParksPage component for Solo Project App for Prime Academy
// created by Adam Boerhave, November 2020
// This should be the first page the user is brought to when signed in,
// and it will display all theme parks stored in the database

import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { Link } from 'react-router-dom';

class ParksPage extends Component {

    componentDidMount = () => {
        // get request to get array of list of parks from database
        this.getParks();
    }

    getParks = () => {
        this.props.dispatch({type: 'GET_PARKS'});
    }

    render() {
        return (
            <>
                <h4 id="welcome">Welcome, {this.props.store.user.username}!</h4>
                <div className="center">
                    <h2>Parks</h2>
                    <h4>Tap a park name to see a list of experiences there</h4>
                    {/* map through all parks in the parks reducer and display them on the screen as links */}
                    <ul>
                        {this.props.store.parks.map((park) => {
                            return (
                                <li key={park.id} className="parkList">
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
