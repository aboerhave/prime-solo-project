import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';


class AttractionsPage extends Component {


    componentDidMount = () => { 
        // find id for park chosen by user that is in the url parameter
        const { id } = this.props.match.params;
        console.log('id', id);
        // get the one park chosen
        this.props.dispatch({type: 'GET_SINGLE_PARK', payload: id});
        // get favorite attractions for user
        this.props.dispatch({type: 'GET_FAVORITES'});
        this.props.dispatch({type: 'GET_OFF_FAVORITES'});
        // get the attractions at the chosen park
        this.props.dispatch({type: 'GET_ATTRACTIONS', payload: id});
    }

    renderFavorite = (attractionId) => {
        console.log('attractionID', attractionId);
        console.log(this.props.store.favorites);
        // check to see if this number that is the attractionId is
        // in the list of attractionIds in the favorite table
        if(this.props.store.favorites.some(attraction => attraction.attraction_id === attractionId)){
            console.log('yes');
            return(
                <button className="heartButton" onClick={()=>this.handleClickOff(attractionId)}><span role="img" className="heart" aria-labelledby="orange heart">🧡</span></button>
            )
        }
        else {
            return(
                <button className="heartButton" onClick={()=>this.handleClickOn(attractionId)}><span role="img" className="heart" aria-labelledby="white heart">🤍</span></button>
            )
        }
    }

    handleClickOff = (attractionId) => {
        console.log('clicked', attractionId);
        console.log('option1');
        
        this.props.dispatch({type: 'TOGGLE_FAVORITE', payload: attractionId});
    }

    handleClickOn = (attractionId) => {
        console.log('clicked', attractionId);
        // it should go to this section if the user has previously set it as a favorite
        // and turned it off again so that it exists in the favorites table
        if(this.props.store.offFavorites.some(attraction => attraction.attraction_id === attractionId)){
            console.log('option2');
            
            this.props.dispatch({type: 'TOGGLE_FAVORITE', payload: attractionId});        
        }
        // it should go here if the attraction has not been set as a favorite by
        // the user yet
        else {
            console.log('option3');
            
            this.props.dispatch({type: 'SET_ATTRACTION_AS_FAVORITE', payload: attractionId});            
        }
    }

    // park id is sent in as parameter from render section
    toDateSelection = (id) => {
        console.log('clicked', id);
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
                <h3>Attractions</h3>
                <ul>
                    {/* put list of attractions here */}
                    {this.props.store.attractions.map((attraction) => {
                        return(
                            <li key={attraction.id} >
                                <p>
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
