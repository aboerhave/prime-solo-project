// parks saga for Solo Project App for Prime Academy
// created by Adam Boerhave, November 2020
// contains the saga to get the list of parks from the database

import {put, takeEvery} from 'redux-saga/effects';
import axios from 'axios';

// function to get all the parks from database
function* getParks() {
    try {
        console.log('in getParks function');
        const parksResponse = yield axios.get('/api/parks');
        console.log('parksResponse.data', parksResponse.data);
        // send the array of parks to the parks reducer
        yield put({type: 'SET_PARKS', payload: parksResponse.data});
    }
    catch (error) {
        console.log('error in getParks function', error);        
    }
}

// watcher saga to watch for GET_PARKS action
function* parksSaga() {
    console.log('in parksSaga');
    
    yield takeEvery('GET_PARKS', getParks);
}

export default parksSaga;



