import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

// Basic class component structure for React with default state
// value setup. When making a new component be sure to replace
// the component name TemplateClass with the name for the new
// component.
class DateSelection extends Component {
    state = {
        heading: 'Date Selection',
        date: ''
    };
    
    handleChange = (event, input) => {
        console.log('input', input);
        this.setState({
            date: event.target.value
        })
    }

    componentDidMount = () => {
        const { id } = this.props.match.params;
        this.props.dispatch({type: 'GET_SINGLE_PARK', payload: id});
    }

    render() {
        return (
            <div>
                <h2>{this.state.heading}</h2>
                <h2>Select a date for a visit to {this.props.store.singlePark.name}</h2>
                <label for="parkVisitDate">Park Visit Date:</label>
                <input onChange={(event) => this.handleChange(event, 'date')} type="date" id="birthday" name="parkVisitDate" />
                <input onClick={this.handleSubmit} type="submit" />
                {JSON.stringify(this.state)}
            </div>
        );
    }
}

export default connect(mapStoreToProps)(DateSelection);
