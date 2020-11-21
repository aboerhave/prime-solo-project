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
        notes: '',
        logId: 0
    };

    componentDidMount = () => {
        this.props.dispatch({type: 'GET_NOTES', payload: this.props.match.params.id});
        this.props.dispatch({type: 'GET_VISIT_PARK', payload: this.props.match.params.id})
        // console.log(this.props.store.singleParkVisit);
        // const { parkId } = this.props.store.singleParkVisit.park_id;
        // console.log('parkId', parkId);
        
        this.props.dispatch({type: 'GET_FAVORITES'});
        this.props.dispatch({type: 'GET_OFF_FAVORITES'});
        // // get the attractions at the chosen park
        // this.props.dispatch({type: 'GET_ATTRACTIONS', payload: this.props.store.singleParkVisit.park_id});
        this.props.dispatch({type: 'GET_ATTRACTIONS_FOR PARK_VISIT', payload: this.props.match.params.id});
        this.props.dispatch({type: 'GET_ATTRACTIONS_QUANTITY', payload: this.props.match.params.id});
    }

    // It works ok now, but still gives value false to singleVisit
    // afterwards
    componentDidUpdate = () => {
        if (this.props.store.singleVisit =! this.state.logId) {
            console.log('state', this.state);
            
            this.setState({
                notes: this.props.store.notes,
                logId: this.props.store.singleVisit
            })
        }
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

    handleIncrementClick = (attractionId) => {
        console.log('ridden today clicked for attraction id', attractionId);
        // check to see if the attraction has been ridden yet and is in the attractionsQuantity
        // reducer to know if post or put is needed
        if (this.props.store.attractionsQuantity.some(attraction => attraction.attractions_id === attractionId)) {
            console.log('this is in the already ridden list => can increase');
            let dataToSend = {
                parkVisitId: this.props.store.singleParkVisit.id,
                attraction: attractionId
            }
            this.props.dispatch({type: 'ADD_ONE_RIDE', payload: dataToSend});
        }
        else {
            console.log('not ridden yet => need post');
            let dataToSend = {
                parkVisitId: this.props.store.singleParkVisit.id,
                attraction: attractionId
            }
            this.props.dispatch({type: 'POST_ONE_RIDE', payload: dataToSend})
        }
    }

    renderQuantity = (attractionId) => {
        // this part puts words on the page to say that the ride has been ridden
        // only if that quantity is greater than 0
        if (this.props.store.attractionsQuantity.some(attraction => attraction.attractions_id === attractionId)) {
            let attractionsQuantityIndex = this.props.store.attractionsQuantity.find(attraction => attraction.attractions_id === attractionId);
            let attractionsQuantity = attractionsQuantityIndex.times_ridden
            // this part just does conditional rendering to change 1 time
            // to multiple times when greater than 1
            if (attractionsQuantity == 1) {

                return (
                    <p>1 time ridden today</p>
                )
            }
            else {
                return (
                    <p>{attractionsQuantity} times ridden today</p>
                )
            }
        }
    }

    handleNotesChange = (event) => {
        this.setState({
            notes: event.target.value
        })
    }

    handleNotesSave = () => {
        console.log('save clicked');
        let dataToSend = {
            notes: this.state.notes,
            visitId: this.props.store.singleParkVisit.id
        }
        this.props.dispatch({type: 'SAVE_NOTES', payload: dataToSend});
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
                                {/* put button to increase here and then make button click functionality
                                different if the attraction is already in the quantity reducer, meaning it has 
                                already been ridden at least once */}
                                <button onClick={()=>this.handleIncrementClick(attraction.id)}>Ridden Today</button>
                                {this.renderQuantity(attraction.id)}
                            </li>
                        )
                    })}
                </ul>
                <label for="notesBox">Additional Notes</label>
                    <br/>
                    
                    <textarea id="notesBox" 
                    onChange={(event) => this.handleNotesChange(event)} 
                    value={this.state.notes}>
                    </textarea>
                    <button onClick={this.handleNotesSave}>Save Notes</button>
                    {JSON.stringify(this.state.notes)}
                    {JSON.stringify(this.props.store.notes)}
                    {/* <h5>{this.props.store.notes}</h5> */}
            </div>
        );
    }
}

export default connect(mapStoreToProps)(DailyLogPage);
