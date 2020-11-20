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

    componentDidMount = () => {
        const { id } = this.props.match.params;
        this.props.dispatch({type: 'GET_SINGLE_PARK', payload: id});
    }
    
    handleChange = (event, input) => {
        console.log('input', input);
        this.setState({
            date: event.target.value
        })
    }
    
    componentDidUpdate = () => {
        console.log('hello');
        
        // this makes the if true if there is a value in the singleVisit reducer 
        // after a new date is selected, and sends the page to the 
        // dailyLog component 
        if (Object.keys(this.props.store.singleVisit).length) {
            // this.props.history.push(`/dailyLog/${this.props.store.singleVisit.id}`)
        }
        
        
    }

    handleSubmit = () => {
        console.log(this.state.date);
        let inputDate = this.state.date;
        let inputYear = inputDate.slice(0,4);
        let inputMonth = inputDate.slice(5,7);
        let inputDateNumber = inputDate.slice(8,10);
        console.log('input date after i sliced it', inputYear + '-' + inputMonth + '-' + inputDateNumber);
        
        let date = new Date();
        let currentYear = date.getFullYear();
        let currentMonth = date.getMonth() + 1;
        let currentDateNumber = date.getDate();
        // make it match the way it is displayed from the input
        let currentDate = currentYear + '-' + currentMonth + '-' + currentDateNumber;
        console.log('currentDate', currentDate);
        // check to make sure the date selected is not in the future
        // check year first
        if (inputYear > currentYear ) {
            alert('The date may not be in the future');
            return
        }
        else if (inputMonth > currentMonth) {
            alert('The date may not be in the future');
            return
        }
        else if (inputDateNumber > currentDateNumber) {
            alert('The date may not be in the future');
            return
        }
        else {
            // at this point, date is past or current date => have user confirm
            let accept = window.confirm(`Please verify that you have selected the correct date: ${inputMonth}/${inputDateNumber}/${inputYear}`);
            if (accept !== true) {
                return
            }
            else {
                // user confirmed date is correct => send to database
                // let dateToSend = {date: inputDate} 
                // const {history} = this.props;
                // console.log('history', history);
                
                this.props.dispatch({type: 'ADD_DATE', payload: {date: inputDate, park: this.props.match.params.id}});
            }
        }        
    }

    render() {
        return (
            <div>
                <h2>{this.state.heading}</h2>
                <h2>Select a date for a visit to {this.props.store.singlePark.name}</h2>
                <label for="parkVisitDate">Park Visit Date (MM/DD/YYYY):</label>
                <input onChange={(event) => this.handleChange(event, 'date')} type="date" id="birthday" name="parkVisitDate" />
                <button onClick={this.handleSubmit}>Begin Record for this Date at {this.props.store.singlePark.name}</button>
                {JSON.stringify(this.state)}
                <br/>
                {/* {JSON.stringify(this.props)} */}
            </div>
        );
    }
}

export default connect(mapStoreToProps)(DateSelection);
