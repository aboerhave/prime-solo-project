// PreviousVisitDetailPage component for Solo Project App for Prime Academy
// created by Adam Boerhave, November 2020
// User can arrive here by clicking see visit details on the Saved Visits Page.
// Here, only the things that have been complete appear, as well as the notes, so that it appears
// cleaner 

import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

class PreviousVisitDetailPage extends Component {

    // do these things when the page loads
    componentDidMount = () => {
        // get the attractions that have been experienced at least once
        this.props.dispatch({type: 'GET_ATTRACTIONS_QUANTITY', payload: this.props.match.params.id});
        // get the notes that habe been saved
        this.props.dispatch({type: 'GET_NOTES', payload: this.props.match.params.id});
        // get details about the visit
        this.props.dispatch({type: 'GET_VISIT_PARK', payload: this.props.match.params.id});
    }

    render() {
        return (
            <div className="center">
                <h2>Details</h2>
                {/* once the date exists in the reducer, display all details about the visit */}
                {this.props.store.singleParkVisit.date &&
                    <>
                        <h3>{this.props.store.singleParkVisit.name}<br/>
                        {this.props.store.singleParkVisit.city}, {this.props.store.singleParkVisit.state}</h3>
                        <h3>{this.props.store.singleParkVisit.date.slice(5,7) + '/' 
                        + this.props.store.singleParkVisit.date.slice(8,10) + '/'
                        + this.props.store.singleParkVisit.date.slice(0,4)}</h3>
                    </>    
                }
                {/* list attractions that have been experience that visit */}
                <ul>
                    {this.props.store.attractionsQuantity.map((attraction) => {
                        return (
                            <li key={attraction.attractions_id}>
                                {attraction.times_ridden == 1 ?
                                    <h5>{attraction.name}: 1 time</h5>
                                :
                                    <h5>{attraction.name}: {attraction.times_ridden} times</h5>
                                }
                            </li>
                        )
                    })}
                </ul>
                {/* display notes at bottom */}
                {this.props.store.notes &&
                    <p>Notes: {this.props.store.notes}</p>
                }   
            </div>
        );
    }
}

export default connect(mapStoreToProps)(PreviousVisitDetailPage);
