// date saga for Solo Project App for Prime Academy
// created by Adam Boerhave, November 2020
// contains the saga to add a new date and park entry in the parkVisits table in the database
// and then advance the user to the dailyLogPage for that new visit

import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

// function to add a new park visit to the database
function* addDate(action) {
    try {
        console.log('addDate history received', action.history);
        
        console.log('addDate action.payload', action.payload);
        
        const dateResponse = yield axios.post('/api/dates',  action.payload);
        let dateId = dateResponse.data[0].id;
        console.log('dateId', dateId);
        
        let locationToGoTo = action.location + `/${dateId}`;
        
        yield put({type: 'SET_SINGLE_VISIT', payload: dateId});
        // advance the user to the dailyLogPage
        yield action.history.push(locationToGoTo)
    }
    catch (error) {
        console.log('error in add Date function', error);
    }
}

// watcher saga for ADD_DATE action type
function* datesSaga() {
    console.log('in datesSaga');
    
    yield takeEvery('ADD_DATE', addDate);
}

export default datesSaga;

