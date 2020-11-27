import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';


class SavedVisitsPage extends Component {

    componentDidMount = () => {
        // get the visits for this user
        this.props.dispatch({type: 'GET_ALL_VISITS_FOR_USER'});
    }

    handleDelete = (visitId) => {
        console.log('visitId', visitId);
        let accept = window.confirm('Please confirm that you would like to delete this visit from the list');
        if(accept){
            this.props.dispatch({type: 'DELETE_VISIT', payload: visitId});
        }
    }

    handleEdit = (visitId) => {
        console.log('edit clicked visit Id', visitId);
        this.props.history.push(`/dailyLog/${visitId}`);
    }

    handleDisplay = (visitId) => {
        console.log('display clicked visit Id', visitId);
        this.props.history.push(`/previousVisitDetail/${visitId}`);
    }

    render() {
        return (
            <div className="center">
                <h2>Saved Visits</h2>
                <ul>
                    {this.props.store.userVisits.map((visit) => {
                        let fullDate = visit.date.slice(0,10)
                        let displayDate = fullDate.slice(5,7) + '/' + fullDate.slice(8,11) + '/' + fullDate.slice(0, 4);
                        return (
                            <li key = {visit.id} className="savedVisitsList">
                                <h4>{displayDate} {visit.name}<br/>
                                {visit.city}, {visit.state}</h4>
                                {visit.visit_complete ? 
                                <button onClick={()=>this.handleDisplay(visit.id)} className="wordButton">See Visit Details</button>
                                :
                                <button onClick={()=>this.handleEdit(visit.id)} className="wordButton">Edit Visit</button>
                                }
                                <button onClick={()=>this.handleDelete(visit.id)} className="deleteButton">Delete Entry</button>
                            </li>
                        )
                    })}
                </ul>
            </div>
        );
    }
}

export default connect(mapStoreToProps)(SavedVisitsPage);
