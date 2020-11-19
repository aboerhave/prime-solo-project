import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';


class AttractionsPage extends Component {

    
    state = {
        heading: 'Class Component',
    };

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

    refreshFavorites = () => {
        const { id } = this.props.match.params;
        // get favorite attractions for user
        this.props.dispatch({type: 'GET_FAVORITES'});
        this.props.dispatch({type: 'GET_OFF_FAVORITES'});
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
                <button onClick={()=>this.handleClickOff(attractionId)}><span>🧡</span></button>
            )
        }
        else {
            return(
                <button onClick={()=>this.handleClickOn(attractionId)}><span>🤍</span></button>
            )
        }
    }

    handleClickOff = (attractionId) => {
        console.log('clicked', attractionId);
        this.props.dispatch({type: 'TOGGLE_FAVORITE', payload: attractionId});
        this.refreshFavorites();
    }

    handleClickOn = (attractionId) => {
        console.log('clicked', attractionId);
        // it should go to this section if the user has previously set it as a favorite
        // and turned it off again so that it exists in the favorites table
        if(this.props.store.offFavorites.some(attraction => attraction.attraction_id === attractionId)){

            this.props.dispatch({type: 'TOGGLE_FAVORITE', payload: attractionId});        
            this.refreshFavorites();
        }
        // it should go here if the attraction has not been set as a favorite by
        // the user yet
        else {
            this.props.dispatch({type: 'SET_ATTRACTION_AS_FAVORITE', payload: attractionId});            
            this.refreshFavorites();
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
            <div>
                <h3>parks id is {id} </h3>
                <h3>{this.props.store.singlePark.name}</h3>
                <button onClick={()=>this.toDateSelection(id)}>Make a New Record For this Park</button>
                <ul>
                    {/* put list of attractions here */}
                    {this.props.store.attractions.map((attraction) => {
                        return(
                            <li key={attraction.id} >
                                {attraction.name}
                                <br/>
                                {attraction.id}
                                {/* {attraction.} */}
                                {this.renderFavorite(attraction.id)}

                            </li>
                        )
                    })}
                </ul>
            </div>
        );
    }
}

export default connect(mapStoreToProps)(AttractionsPage);
