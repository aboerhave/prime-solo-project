// DateSelectionPage component for Solo Project App for Prime Academy
// created by Adam Boerhave, November 2020
// This user will be brought here when they click the button on the 
// attraction page to create a new entry.  User will select a date here,
// then move onto dailyLogPage

import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

class DateSelection extends Component {
    // initial state before date is selected
    state = {
        date: ''
    };

    // get the id of the park the user wants to store when the page is loaded
    componentDidMount = () => {
        const { id } = this.props.match.params;
        this.props.dispatch({type: 'GET_SINGLE_PARK', payload: id});
    }
    
    // when user picks a date, take it in and make sure it is not a future date
    handleChange = (event) => {
        // inputDate is date selected by user in the box
        let inputDate = event.target.value;
        let inputYear = inputDate.slice(0,4);
        let inputMonth = inputDate.slice(5,7);
        let inputDateNumber = inputDate.slice(8,10);
        let inputDateToCheck = new Date(inputYear, inputMonth - 1, inputDateNumber);
        let currentDate = new Date();
        // check to make sure the date selected is not in the future
        // this one is for if they select a future date
        // it should be an error
        if (inputDateToCheck > currentDate) {
            alert('The date may not be in the future');
        }
        // otherwise save the date in local state
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
            // the park id as well as history is sent to the saga to route the 
            // user to the dailyLog page once the post is complete
            this.props.dispatch({
                type: 'ADD_DATE', 
                payload: {date: inputDate, park: this.props.match.params.id}, 
                history: this.props.history, 
                location: '/dailyLog'
            });
        }        
    }

    // This function gets the current date and saves it in local state if the 
    // 'Select Today's Date' Button is clicked
    handleTodayClick = () => {
      let todaysDate = new Date();
      console.log('todaysDate', todaysDate);

      let today = new Date(todaysDate.getTime() - (todaysDate.getTimezoneOffset() * 60000)).toJSON().slice(0,10);
      console.log('today', today);

      this.setState({
        date: today
      })
    }

    render() {
        return (
            <div className="center">
                <h2>Daily Log</h2>
                <h2>Select a date for a visit to {this.props.store.singlePark.name}</h2>
                <button className="wordButton" onClick={this.handleTodayClick}>Select Today's Date</button>
                <br/>
                <p>------ &nbsp;&nbsp;&nbsp;&nbsp;  OR &nbsp;&nbsp;&nbsp;&nbsp;  ------</p>
                {/* <label for="parkVisitDate">Park Visit Date (MM/DD/YYYY):</label> */}
                <input onChange={(event) => this.handleChange(event)} type="date" id="visitDate" name="parkVisitDate" value = {this.state.date} />
                <br/>
                <button className="wordButton" onClick={this.handleSubmit}>
                    Begin Record for this Date at {this.props.store.singlePark.name}
                </button>
            </div>
        );
    }
}

export default connect(mapStoreToProps)(DateSelection);
