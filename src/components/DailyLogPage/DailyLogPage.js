import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';


class DailyLogPage extends Component {
    state = {
        notes: '',
        logId: 0
    };

    componentDidMount = () => {
        this.props.dispatch({type: 'GET_VISIT_PARK', payload: this.props.match.params.id})
        
        this.props.dispatch({type: 'GET_FAVORITES'});
        this.props.dispatch({type: 'GET_OFF_FAVORITES'});
        // get the attractions at the chosen park
        this.props.dispatch({type: 'GET_ATTRACTIONS_FOR_PARK_VISIT', payload: this.props.match.params.id});
        this.props.dispatch({type: 'GET_ATTRACTIONS_QUANTITY', payload: this.props.match.params.id});
        this.props.dispatch({type: 'GET_NOTES', payload: this.props.match.params.id});
    }

    
    componentDidUpdate = () => {
        if (this.props.store.singleVisit !== this.state.logId) {
            console.log('state', this.state);
            
            this.setState({
                notes: this.props.store.notes,
                logId: this.props.store.singleVisit
            })
        }
    }

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
                    <p>1 time experienced today</p>
                )
            }
            else {
                return (
                    <p>{attractionsQuantity} times experienced today</p>
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

    handleCompleteVisit = () => {
        console.log('clicked', this.props.store.singleParkVisit.id);
        this.props.dispatch({
            type: 'VISIT_COMPLETE', 
            payload: this.props.store.singleParkVisit.id,
            history: this.props.history,
            location: '/previousVisitDetail'
        });
    }

    renderDate = (date) => {
        console.log('date', date);
        let month = date.slice(5, 7);
        console.log(month);
        let dayNumber = date.slice(8, 10);
        console.log('day Number', dayNumber);
        let year = date.slice(0, 4);
        console.log('year', year);
        return (
            <h3>{month}/{dayNumber}/{year}</h3>
        )
    }

    render() {
        return (
            <div className="center">
                <h2>Daily Log</h2>
                    {this.props.store.singleParkVisit.date && 
                        <>
                        <h3>{this.props.store.singleParkVisit.name}</h3>
                        {this.renderDate(this.props.store.singleParkVisit.date)}
                        </>
                    }
                <ul className="logList">
                    {/* put list of attractions here */}
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
                                    <button className="disabledBtn wordButton">Experienced Today</button>
                                }   
                            {this.renderQuantity(attraction.id)}
                            </li>
                        )
                    })}
                </ul>
                <label htmlFor="notesBox">Additional Notes:</label>
                <br/>
                {!this.props.store.singleParkVisit.visit_complete ?
                    <>
                        <textarea id="notesBox" 
                            onChange={(event) => this.handleNotesChange(event)} 
                            value={this.state.notes}
                        />
                        <button onClick={this.handleNotesSave} className="wordButton">Save Notes</button>
                    </>
                :
                    <>
                        <textarea id="notesBox" readOnly
                            value={this.state.notes}
                        />    
                        <button className="disabledBtn wordButton">Save Notes</button>
                    </>
                }
                {/* if the park visit is complete, "disable" the button */}
                {!this.props.store.singleParkVisit.visit_complete ?
                    <button onClick={this.handleCompleteVisit} className="wordButton">Complete Visit</button>
                :
                    <button className="disabledBtn woredButton">Complete Visit</button>
                }
            </div>
        );
    }
}

export default connect(mapStoreToProps)(DailyLogPage);
