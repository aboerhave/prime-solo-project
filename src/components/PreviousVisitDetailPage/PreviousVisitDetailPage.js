import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

// Basic class component structure for React with default state
// value setup. When making a new component be sure to replace
// the component name TemplateClass with the name for the new
// component.
class PreviousVisitDetailPage extends Component {
    state = {
        heading: 'Details',
    };

    componentDidMount = () => {
        this.props.dispatch({type: 'GET_VISIT_DETAILS', payload: this.props.match.params.id});
        this.props.dispatch({type: 'GET_ATTRACTIONS_QUANTITY', payload: this.props.match.params.id});
        this.props.dispatch({type: 'GET_NOTES', payload: this.props.match.params.id});

    }

    render() {
        return (
            <div>
                <h2>{this.state.heading}</h2>
                {this.props.store.visitDetails[0] &&
                <>
                    <h2>{this.props.store.visitDetails[0].name}</h2>
                    <h2>{this.props.store.visitDetails[0].city}</h2>
                    <h2>{this.props.store.visitDetails[0].state}</h2>
                    <h2>{this.props.store.visitDetails[0].date.slice(5,7) + '/' 
                    + this.props.store.visitDetails[0].date.slice(8,10) + '/'
                    + this.props.store.visitDetails[0].date.slice(0,4)}</h2>
                </>    
                }
                <ul>
                    {this.props.store.attractionsQuantity.map((attraction) => {
                        return (
                            <li key={attraction.attractions_id}>
                                {attraction.name}
                                {attraction.times_ridden == 1 ?
                                <p>1 time</p>
                                :
                                <p>{attraction.times_ridden} times</p>
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
