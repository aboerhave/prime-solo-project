import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

// Basic class component structure for React with default state
// value setup. When making a new component be sure to replace
// the component name TemplateClass with the name for the new
// component.
class PreviousVisitDetailPage extends Component {


    componentDidMount = () => {
        this.props.dispatch({type: 'GET_VISIT_DETAILS', payload: this.props.match.params.id});
        this.props.dispatch({type: 'GET_ATTRACTIONS_QUANTITY', payload: this.props.match.params.id});
        this.props.dispatch({type: 'GET_NOTES', payload: this.props.match.params.id});
        this.props.dispatch({type: 'GET_VISIT_PARK', payload: this.props.match.params.id});

    }

    render() {
        return (
            <div className="center">
                <h2>Details</h2>
                {this.props.store.singleParkVisit.date &&
                <>
                    <h3>{this.props.store.singleParkVisit.name}</h3> 
                    <h3>{this.props.store.singleParkVisit.city}, {this.props.store.singleParkVisit.state}</h3>
                    <h3>{this.props.store.singleParkVisit.date.slice(5,7) + '/' 
                    + this.props.store.singleParkVisit.date.slice(8,10) + '/'
                    + this.props.store.singleParkVisit.date.slice(0,4)}</h3>
                </>    
                }
                <ul>
                    {this.props.store.attractionsQuantity.map((attraction) => {
                        return (
                            <li key={attraction.attractions_id}>
                                {attraction.times_ridden == 1 ?
                                <>
                                    <h5>{attraction.name}: 1 time</h5>
                                </>
                                :
                                <>
                                    <h5>{attraction.name}: {attraction.times_ridden} times</h5>
                                </>
                                }
                            </li>
                        )
                    })}
                </ul>
                {this.props.store.notes &&
                    <p>Notes: {this.props.store.notes}</p>
                }   
            </div>
        );
    }
}

export default connect(mapStoreToProps)(PreviousVisitDetailPage);
