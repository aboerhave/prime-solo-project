// DailyLogPage component for Solo Project App for Prime Academy
// created by Adam Boerhave, November 2020
// User can arrive here after selecting a date from the dateSelectionpage or 
// after clicking edit for a previously saved visit.  They have the ability
// to increment attraction that have been experience here, and add additional 
// notes.  When finished, they may complete the visit to remove editing capabilities 
// for the future

import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';


class DailyLogPage extends Component {
    // local state for notes and logId used to save notes
    state = {
        notes: '',
        logId: 0
    };

    componentDidMount = () => {
        // get the notes the user has alread saved
        this.props.dispatch({type: 'GET_NOTES', payload: this.props.match.params.id});
        // get all park visit details for this visit being edited
        this.props.dispatch({type: 'GET_VISIT_PARK', payload: this.props.match.params.id})
        // get user's saved favorites
        this.props.dispatch({type: 'GET_FAVORITES'});
        // get user's previously saved favorites that have been turned off
        this.props.dispatch({type: 'GET_OFF_FAVORITES'});
        // get the attractions at the chosen park
        this.props.dispatch({type: 'GET_ATTRACTIONS_FOR_PARK_VISIT', payload: this.props.match.params.id});
        // get the number of times the user has already done any of these attractions
        this.props.dispatch({type: 'GET_ATTRACTIONS_QUANTITY', payload: this.props.match.params.id});
    }

    // this part helps to make sure the notes get updated correctly
    componentDidUpdate = () => {
        if (this.props.store.singleVisit !== this.state.logId) {
            console.log('state', this.state);
            
            this.setState({
                notes: this.props.store.notes,
                logId: this.props.store.singleVisit
            })
        }
    }

    // This render section works similarly to the render section from the AttractionsPage component
    // Attractions get an orange heart if currently saved as a favorite and a white heart otherwise
    renderFavorite = (attractionId) => {
        // check to see if this number that is the attractionId is
        // in the list of attractionIds in the favorite table
        if(this.props.store.favorites.some(attraction => attraction.attraction_id === attractionId)){
            return(
                <button onClick={()=>this.handleClickOff(attractionId)} className="heartButton"><span role="img" className="heart" aria-labelledby="orange heart">🧡</span></button>
            )
        }
        else {
            return(
                <button onClick={()=>this.handleClickOn(attractionId)} className="heartButton"><span role="img" className="heart" aria-labelledby="white heart">🤍</span></button>
            )
        }
    }

    // toggle the favorite_status to false if the attraction is currently on and clicked
    handleClickOff = (attractionId) => {
        this.props.dispatch({type: 'TOGGLE_FAVORITE', payload: attractionId});
    }

    // make the favorite_status true for the attraction
    handleClickOn = (attractionId) => {
        // it should go to this section if the user has previously set it as a favorite
        // and turned it off again so that it exists in the favorites table
        if( this.props.store.offFavorites.some(attraction => attraction.attraction_id === attractionId )){
            this.props.dispatch({type: 'TOGGLE_FAVORITE', payload: attractionId});        
        }
        // it should go here if the attraction has not been set as a favorite by
        // the user yet to require a new post of the attraction to the favorites table
        else {
            this.props.dispatch({type: 'SET_ATTRACTION_AS_FAVORITE', payload: attractionId});            
        }
    }

    // this function will run when the user clicks 'experenced today'
    handleIncrementClick = (attractionId) => {
        console.log('ridden today clicked for attraction id', attractionId);
        // check to see if the attraction has been ridden yet and is in the attractionsQuantity
        // reducer to know if post or put is needed
        // first case - already ridden, and in attractionsQuantity reducer, so put needed
        if (this.props.store.attractionsQuantity.some(attraction => attraction.attractions_id === attractionId)) {
            // console.log('this is in the already ridden list => can increase');
            let dataToSend = {
                parkVisitId: this.props.store.singleParkVisit.id,
                attraction: attractionId
            }
            this.props.dispatch({type: 'ADD_ONE_RIDE', payload: dataToSend});
        }
        // second case - not in attractions Quantity reducer yet, so post needed for attraction
        else {
            // console.log('not ridden yet => need post');
            let dataToSend = {
                parkVisitId: this.props.store.singleParkVisit.id,
                attraction: attractionId
            }
            this.props.dispatch({type: 'POST_ONE_RIDE', payload: dataToSend})
        }
    }

    // display the number of times the user has experienced the attraction during the day, based on times_ridden
    // for the attraction in the visits_attractions database
    renderQuantity = (attractionId) => {
        // this part puts words on the page to say that the ride has been ridden
        // only if that quantity is greater than 0
        if (this.props.store.attractionsQuantity.some(attraction => attraction.attractions_id === attractionId)) {
            // this next line finds the object where the attractionId checked for matches attractionsQuantity
            let attractionsQuantityIndex = this.props.store.attractionsQuantity.find(attraction => attraction.attractions_id === attractionId);
            console.log('attractionsQuantityIndex', attractionsQuantityIndex);
            
            let attractionsQuantity = attractionsQuantityIndex.times_ridden
            // this part just does conditional rendering to change 1 time
            // to multiple times when greater than 1
            if (attractionsQuantity == 1) {
                return (
                    <p>Experienced 1 time today</p>
                )
            }
            else {
                return (
                    <p>Experienced {attractionsQuantity} times today</p>
                )
            }
        }
    }

    // update the text typed in the notes box to go to the value of notes in local state
    handleNotesChange = (event) => {
        this.setState({
            notes: event.target.value
        })
    }

    // save notes that are in local state and send to database
    handleNotesSave = () => {
        console.log('notes save clicked');
        let dataToSend = {
            notes: this.state.notes,
            visitId: this.props.store.singleParkVisit.id
        }
        this.props.dispatch({type: 'SAVE_NOTES', payload: dataToSend});
    }

    // when user clicks complete visit, visit_complete in database is changed from false to true,
    // and user is sent to PreviousDetailPage.  Buttons and text box are disabled on this page for 
    // if they come back here.
    handleCompleteVisit = () => {
        console.log('clicked', this.props.store.singleParkVisit.id);
        let accept = window.confirm(`Are you finished with your visit?  This will not allow you to edit the details anymore.`);
        if (!accept) {
            return;
        }
        // if user click yes, continue with complete visit function
        else {
            this.props.dispatch({
                type: 'VISIT_COMPLETE', 
                payload: this.props.store.singleParkVisit.id,
                history: this.props.history,
                location: '/previousVisitDetail'
            });
        }
    }

    // this section turns te date text from the database into a readable date format
    renderDate = (date) => {
        console.log('date', date);
        let month = date.slice(5, 7);
        console.log(month);
        let dayNumber = date.slice(8, 10);
        console.log('day Number', dayNumber);
        let year = date.slice(0, 4);
        console.log('year', year);
        return (
            <>{month}/{dayNumber}/{year}</>
        )
    }

    render() {
        return (
            <div className="center">
                <h2>Daily Log</h2>
                {/* park name and date */}
                {this.props.store.singleParkVisit.date && 
                    <>
                        <h3>{this.props.store.singleParkVisit.name}
                        <br/>
                        {this.renderDate(this.props.store.singleParkVisit.date)}</h3>
                    </>
                }
                <ul>
                    {/* put list of attractions here */}
                    {/* if park visit is complete, notes box is read only and button is disabled */}
                    {this.props.store.visitAttractions.map((attraction) => {
                        return(
                            <li key={attraction.id} className="logList">
                                {this.renderFavorite(attraction.id)}
                                {attraction.name}
                                <br/>
                            
                                {/* put button to increase here and then make button click functionality
                                different if the attraction is already in the quantity reducer, meaning it has 
                                already been ridden at least once */}
                                {!this.props.store.singleParkVisit.visit_complete ?
                                    <button onClick={()=>this.handleIncrementClick(attraction.id)} className="wordButton">Experienced Today</button>
                                :
                                    // rendered disabled if visit complete
                                    <button className="disabledBtn wordButton">Experienced Today</button>
                                }   
                            {this.renderQuantity(attraction.id)}
                            </li>
                        )
                    })}
                </ul>
                <label htmlFor="notesBox">Additional Notes:</label>
                <br/>
                {/* if park visit is complete, notes box is read only and button is disabled */}
                {!this.props.store.singleParkVisit.visit_complete ?
                    <>
                        <textarea id="notesBox" 
                            onChange={(event) => this.handleNotesChange(event)} 
                            value={this.state.notes}
                        />
                        <button onClick={this.handleNotesSave} className="wordButton saveNotesButton">Save Notes</button>
                    </>
                :
                    <>
                        <textarea id="notesBox" readOnly
                            value={this.state.notes}
                        />    
                        <button className="disabledBtn wordButton saveNotesButton">Save Notes</button>
                    </>
                }
                {/* if the park visit is complete, "disable" the button */}
                {!this.props.store.singleParkVisit.visit_complete ?
                    <button onClick={this.handleCompleteVisit} className="wordButton warningButton">Complete Visit</button>
                :
                    <button className="disabledBtn wordButton warningButton">Complete Visit</button>
                }
            </div>
        );
    }
}

export default connect(mapStoreToProps)(DailyLogPage);
