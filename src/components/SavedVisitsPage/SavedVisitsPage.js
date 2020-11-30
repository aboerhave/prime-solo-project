// SavedVisitsPage component for Solo Project App for Prime Academy
// created by Adam Boerhave, November 2020
// User can arrive here by clicking the Saved Visits link in the navigation
// bar.  It displays all visits that are stored in the database, and allows the
// user to return to the visit to edit it in the DailyLogPage, or go to the PreviousVisitDetails
// page to see what was done.  A visit may be deleted here, also.

import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

class SavedVisitsPage extends Component {

    componentDidMount = () => {
        // get the visits for this user
        this.props.dispatch({type: 'GET_ALL_VISITS_FOR_USER'});
    }

    // this is ran if the delete button is clicked.  The user is prompted to confirm that they want to delete the visit.
    // After accepting, the visit is deleted.
    handleDelete = (visitId) => {
        console.log('visitId', visitId);
        let accept = window.confirm('Please confirm that you would like to delete this visit from the list');
        if(accept){
            this.props.dispatch({type: 'DELETE_VISIT', payload: visitId});
        }
    }

    // the edit visit buttons takes the user back to the visit on the DailyLogPage if it is not complete yet, 
    // and allows them to continue updating it throughout their day.
    handleEdit = (visitId) => {
        // console.log('edit clicked visit Id', visitId);
        this.props.history.push(`/dailyLog/${visitId}`);
    }

    // the See Visit Details button takes the user to the Previous VisitDetails page to view the completed
    // entry
    handleDisplay = (visitId) => {
        // console.log('display clicked visit Id', visitId);
        this.props.history.push(`/previousVisitDetail/${visitId}`);
    }

    render() {
        return (
            <div className="center">
                <h2>Saved Visits</h2>
                {/* once visits are in the reducer, display them on screen */}
                {this.props.store.userVisits[0] &&
                <ul>
                        {this.props.store.userVisits.map((visit) => {
                            let fullDate = visit.date.slice(0,10)
                            let displayDate = fullDate.slice(5,7) + '/' + fullDate.slice(8,11) + '/' + fullDate.slice(0, 4);
                            return (
                                <li key = {visit.id} className="savedVisitsList">
                                    <h4>{displayDate} - {visit.name}<br/>
                                    {visit.city}, {visit.state}</h4>
                                    {/* if the visit_complete boolean is false, show the edit visit button, otherwise
                                    show the see visit details button */}
                                    {visit.visit_complete ? 
                                    <button onClick={()=>this.handleDisplay(visit.id)} className="wordButton">See Visit Details</button>
                                    :
                                    <button onClick={()=>this.handleEdit(visit.id)} className="wordButton">Edit Visit</button>
                                    }
                                    <button onClick={()=>this.handleDelete(visit.id)} className="warningButton">Delete Entry</button>
                                </li>
                            )
                        })}
                </ul>
                }
            </div>
        );
    }
}

export default connect(mapStoreToProps)(SavedVisitsPage);
