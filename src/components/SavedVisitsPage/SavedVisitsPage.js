import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';


class SavedVisitsPage extends Component {

    componentDidMount = () => {
        // get the visits for this user
        this.props.dispatch({type: 'GET_ALL_VISITS_FOR_USER'});
    }

    handleDelete = (visitId) => {
        let accept = window.confirm('Are you sure you want to delete this entry?')
        if (!accept) {
            return
        }
        console.log('visitId', visitId);
        this.props.dispatch({type: 'DELETE_VISIT', payload: visitId});
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
            <div>
                <h2>Saved Visits</h2>
                <ul>
                    {this.props.store.userVisits.map((visit) => {
                        let fullDate = visit.date.slice(0,10)
                        let displayDate = fullDate.slice(5,7) + '/' + fullDate.slice(8,11) + '/' + fullDate.slice(0, 4);
                        return (
                            <li key = {visit.id}>
                                <h5>{displayDate} {visit.name}</h5>
                                <h5>{visit.city}, {visit.state}</h5>
                                {visit.visit_complete ? 
                                <button onClick={()=>this.handleDisplay(visit.id)}>See Visit Details</button>
                                :
                                <button onClick={()=>this.handleEdit(visit.id)}>Edit Visit</button>
                                }
                                <button onClick={()=>this.handleDelete(visit.id)}>Delete Entry</button>
                            </li>
                        )
                    })}
                </ul>
            </div>
        );
    }
}

export default connect(mapStoreToProps)(SavedVisitsPage);
