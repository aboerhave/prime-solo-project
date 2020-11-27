import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

// Basic class component structure for React with default state
// value setup. When making a new component be sure to replace
// the component name TemplateClass with the name for the new
// component.
class DateSelection extends Component {
    state = {
        date: ''
    };

    componentDidMount = () => {
        const { id } = this.props.match.params;
        this.props.dispatch({type: 'GET_SINGLE_PARK', payload: id});
    }
    
    // when user picks a date, take it in and make sure it is not a future date
    handleChange = (event, input) => {
        let inputDate = event.target.value;
        let inputYear = inputDate.slice(0,4);
        let inputMonth = inputDate.slice(5,7);
        let inputDateNumber = inputDate.slice(8,10);
        let inputDateToCheck = new Date(inputYear, inputMonth - 1, inputDateNumber);
        let currentDate = new Date();
        // check to make sure the date selected is not in the future
        console.log('inputDate', inputDate);
        console.log('inputDateToCheck', inputDateToCheck);
        console.log('date', currentDate);
        // this one is for if they select a future date
        // it should be an error
        if (inputDateToCheck > currentDate) {
            alert('The date may not be in the future');
        }
        else {   
            this.setState({
                date: inputDate
            })
        }
    }
    
    // at this point, date is past or current date => have user confirm
    // and send to database
    handleSubmit = () => {
        // check to make sure there is a date selected at all
        if(!this.state.date) {
            alert('Please enter a date');
            return;
        }
        let inputDate = this.state.date;
        let inputYear = inputDate.slice(0,4);
        let inputMonth = inputDate.slice(5,7);
        let inputDateNumber = inputDate.slice(8,10);
        let accept = window.confirm(`Please verify that you have selected the correct date for 
        the visit to ${this.props.store.singlePark.name}: ${inputMonth}/${inputDateNumber}/${inputYear}`);
        if (accept !== true) {
            return
        }
        else {
            // user confirmed date is correct => send to database
            this.props.dispatch({
                type: 'ADD_DATE', 
                payload: {date: inputDate, park: this.props.match.params.id}, 
                history: this.props.history, 
                location: '/dailyLog'
            });
        }        
    }

    render() {
        return (
            <div className="center">
                <h2>Daily Log</h2>
                <h2>Select a date for a visit to {this.props.store.singlePark.name}</h2>
                <label for="parkVisitDate">Park Visit Date (MM/DD/YYYY):</label>
                <input onChange={(event) => this.handleChange(event, 'date')} type="date" id="visitDate" name="parkVisitDate" />
                <button className="wordButton" onClick={this.handleSubmit}>
                    Begin Record for this Date at {this.props.store.singlePark.name}
                </button>
                <br/>
            </div>
        );
    }
}

export default connect(mapStoreToProps)(DateSelection);
