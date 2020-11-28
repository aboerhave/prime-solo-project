// AttractionsPage component for Solo Project App for Prime Academy
// created by Adam Boerhave, November 2020
// This should be the second page the user goes to.
// It will display all attractions available at the selected park,
// and have a button to move onto the dateSelection page to 
// create a new visit entry.

import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';


class AttractionsPage extends Component {


    componentDidMount = () => { 
        // find id for park chosen by user that is in the url parameter
        const { id } = this.props.match.params;
        // get the one park chosen
        this.props.dispatch({type: 'GET_SINGLE_PARK', payload: id});
        // get favorite attractions already saved for user
        this.props.dispatch({type: 'GET_FAVORITES'});
        // get favorites saved for user that have since been removed from favorites list
        this.props.dispatch({type: 'GET_OFF_FAVORITES'});
        // get the attractions at the chosen park
        this.props.dispatch({type: 'GET_ATTRACTIONS', payload: id});
    }

    // this function renders the heart orange for each attraction if it in the 
    // favorites reducer
    renderFavorite = (attractionId) => {
        // check to see if this number that is the attractionId is
        // in the list of attractionIds in the favorites reducer
        if( this.props.store.favorites.some(attraction => attraction.attraction_id === attractionId) ){
            // if the attraction is a favorite, make an orange heart
            return(
                <button className="heartButton" onClick={()=>this.handleClickOff(attractionId)}><span role="img" className="heart" aria-labelledby="orange heart">🧡</span></button>
            )
        }
        else {
            // otherwise make a white heart
            return(
                <button className="heartButton" onClick={()=>this.handleClickOn(attractionId)}><span role="img" className="heart" aria-labelledby="white heart">🤍</span></button>
            )
        }
    }

    // turn the heart off if clicked.  It will always have previously been in the database,
    // so only the toggle is required
    handleClickOff = (attractionId) => {
        // heart will turn from orange to white
        this.props.dispatch({type: 'TOGGLE_FAVORITE', payload: attractionId});
    }

    // turn the heart orange.  If it has not already been made a favorite, it will be posted 
    // to the databae table, and if it has been a favorite previously, it will toggle the 
    // favorite_status in the database
    handleClickOn = (attractionId) => {
        // it should go to this section if the user has previously set it as a favorite
        // and turned it off again so that it exists in the favorites table
        if(this.props.store.offFavorites.some(attraction => attraction.attraction_id === attractionId)){
            // favorite_status will turn to true and heart will become orange
            this.props.dispatch({type: 'TOGGLE_FAVORITE', payload: attractionId});        
        }
        // it should go here if the attraction has not been set as a favorite by
        // the user yet
        else {
            // it will need to be posted to the databae as a new favorite here
            this.props.dispatch({type: 'SET_ATTRACTION_AS_FAVORITE', payload: attractionId});            
        }
    }

    // park id is sent in as parameter from render section
    toDateSelection = (id) => {
        // this sends the page to the date selection component 
        // with the park id in the parameter
        this.props.history.push(`/dateSelection/${id}`);
    }

    render() {
        const { id } = this.props.match.params;
        return (
            <div className="center">
                    <button 
                        className="wordButton"
                        onClick={()=>this.toDateSelection(id)}
                    >
                        Make a New Record<br/> For a Visit to this Park
                    </button>
                <h2>{this.props.store.singlePark.name}</h2>
                <h3>Experiences</h3>
                <ul>
                    {/* put list of attractions here */}
                    {this.props.store.attractions.map((attraction) => {
                        return(
                            <li key={attraction.id} className="attrList">
                                <p>
                                    {/* put heart ahead of attraction name */}
                                    {this.renderFavorite(attraction.id)}
                                    {attraction.name}
                                </p>
                            </li>
                        )
                    })}
                </ul>
            </div>
        );
    }
}

export default connect(mapStoreToProps)(AttractionsPage);
