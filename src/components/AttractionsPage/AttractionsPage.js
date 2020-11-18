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

    renderFavorite = (attractionId) => {
        console.log('attractionID', attractionId);
        console.log(this.props.store.favorites);
        // check to see if this number that is the attractionId is
        // in the list of attractionIds in the favorite table
        if(this.props.store.favorites.some(attraction => attraction.attraction_id === attractionId)){
            console.log('yes');
            return(
                <button><span>🧡</span></button>
            )
        }
        else {
            return(
                <button><span>🤍</span></button>
            )
        }
        
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
