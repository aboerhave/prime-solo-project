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

    render() {
        return (
            <div>
                <h2>{this.state.heading}</h2>
                <h1>previous details</h1>
            </div>
        );
    }
}

export default connect(mapStoreToProps)(PreviousVisitDetailPage);
