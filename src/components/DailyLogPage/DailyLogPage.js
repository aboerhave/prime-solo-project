import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

// Basic class component structure for React with default state
// value setup. When making a new component be sure to replace
// the component name TemplateClass with the name for the new
// component.
class DailyLogPage extends Component {
    state = {
        heading: 'Daily Log Page',
    };

    componentDidMount = () => {
        this.props.dispatch({type: 'GET_VISIT_PARK', payload: this.props.match.params.id})
        // console.log(this.props.store.singleParkVisit);
        // const { parkId } = this.props.store.singleParkVisit.park_id;
        // console.log('parkId', parkId);
        
        this.props.dispatch({type: 'GET_FAVORITES'});
        this.props.dispatch({type: 'GET_OFF_FAVORITES'});
        // // get the attractions at the chosen park
        // this.props.dispatch({type: 'GET_ATTRACTIONS', payload: this.props.store.singleParkVisit.park_id});
        this.props.dispatch({type: 'GET_ATTRACTIONS_FOR PARK_VISIT', payload: this.props.match.params.id});
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
        console.log('option1');
        
        this.props.dispatch({type: 'TOGGLE_FAVORITE', payload: attractionId});
        // this.refreshFavorites();
    }

    handleClickOn = (attractionId) => {
        console.log('clicked', attractionId);
        // it should go to this section if the user has previously set it as a favorite
        // and turned it off again so that it exists in the favorites table
        if(this.props.store.offFavorites.some(attraction => attraction.attraction_id === attractionId)){
            console.log('option2');
            
            this.props.dispatch({type: 'TOGGLE_FAVORITE', payload: attractionId});        
            // this.refreshFavorites();
        }
        // it should go here if the attraction has not been set as a favorite by
        // the user yet
        else {
            console.log('option3');
            
            this.props.dispatch({type: 'SET_ATTRACTION_AS_FAVORITE', payload: attractionId});            
            // this.refreshFavorites();
        }
    }

        render() {
                const { id } = this.props.match.params;
                return (
                    <div>
                    {/* {JSON.stringify(this.props.store)} */}
                        <h3>{this.props.store.singleParkVisit.name}</h3>

                        <ul>
                     {/* put list of attractions here */}
                     {this.props.store.visitAttractions.map((attraction) => {
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

export default connect(mapStoreToProps)(DailyLogPage);








//     refreshFavorites = () => {
//         const { id } = this.props.match.params;
//         // get favorite attractions for user
//         // this.props.dispatch({type: 'GET_FAVORITES'});
//         // this.props.dispatch({type: 'GET_OFF_FAVORITES'});
//         // this.props.dispatch({type: 'GET_ATTRACTIONS', payload: id});
//     }


    // handleClickOff = (attractionId) => {
    //     console.log('clicked', attractionId);
    //     console.log('option1');
        
    //     this.props.dispatch({type: 'TOGGLE_FAVORITE', payload: attractionId});
    //     this.refreshFavorites();
    // }

    // handleClickOn = (attractionId) => {
    //     console.log('clicked', attractionId);
    //     // it should go to this section if the user has previously set it as a favorite
    //     // and turned it off again so that it exists in the favorites table
    //     if(this.props.store.offFavorites.some(attraction => attraction.attraction_id === attractionId)){
    //         console.log('option2');
            
    //         this.props.dispatch({type: 'TOGGLE_FAVORITE', payload: attractionId});        
    //         this.refreshFavorites();
    //     }
    //     // it should go here if the attraction has not been set as a favorite by
    //     // the user yet
    //     else {
    //         console.log('option3');
            
    //         this.props.dispatch({type: 'SET_ATTRACTION_AS_FAVORITE', payload: attractionId});            
    //         this.refreshFavorites();
    //     }
    // }

//     // park id is sent in as parameter from render section
//     toDateSelection = (id) => {
//         console.log('clicked', id);
//         // this sends the page to the date selection component 
//         // with the park id in the parameter
//         this.props.history.push(`/dateSelection/${id}`);
//     }

//     render() {
//         const { id } = this.props.match.params;
//         return (
//             <div>
//             {/* {JSON.stringify(this.props.store)} */}
//                 <h3>parks id is {id} </h3>
//                 <h3>{this.props.store.singlePark.name}</h3>
//                 <button onClick={()=>this.toDateSelection(id)}>Make a New Record For this Park</button>
//                 <ul>
//                     {/* put list of attractions here */}
//                     {this.props.store.attractions.map((attraction) => {
//                         return(
//                             <li key={attraction.id} >
//                                 {attraction.name}
//                                 <br/>
//                                 {attraction.id}
//                                 {/* {attraction.} */}
//                                 {this.renderFavorite(attraction.id)}

//                             </li>
//                         )
//                     })}
//                 </ul>
//             </div>
//         );
//     }
// }

// export default connect(mapStoreToProps)(AttractionsPage);
