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
        this.getPark();
    }

    getPark = () => {
        this.props.dispatch({type: 'GET_VISIT_PARK', payload: this.props.match.params.id})
    }

    render() {
        return (
            <div>
                <h2>{this.state.heading}</h2>
                <h3>{this.props.store.singleParkVisit.name}</h3>
            </div>
        );
    }
}

export default connect(mapStoreToProps)(DailyLogPage);
