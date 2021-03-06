// single_park saga for Solo Project App for Prime Academy
// created by Adam Boerhave, November 2020
// contains the sagas to get the individually selected parks from the database

import {put, takeEvery} from 'redux-saga/effects';
import axios from 'axios';

// function to get the park that has been selected by the user to display attractions at
function* getSinglePark(action) {
    try {
        console.log('in getSinglePark function with parkId', action.payload);
        const singleParkResponse = yield axios.get(`/api/parks/${action.payload}`);
        console.log('singleParkResponse.data', singleParkResponse.data[0]);
        // save the park to the singlePark reducer
        yield put({type: 'SET_SINGLE_PARK', payload: singleParkResponse.data[0]});
    }
    catch (error) {
        console.log('error in getSinglePark function', error);        
    }
}

// function to get details about visit selected
function* getParkForVisit(action) {
    try {
        console.log('in getParkForVisit function', action.payload);
        const parkVisitResponse = yield axios.get(`/api/visitPark/${action.payload}`);
        console.log('parkVisitResponse', parkVisitResponse.data);
        // send to singleParkVisit reducer
        yield put({type: 'SET_VISIT_PARK', payload: parkVisitResponse.data[0]});
    }
    catch(error) {
        console.log('error in getParkForVisit funciton', error );
        
    }
}

// watcher saga to watch for get park actions
function* parksSaga() {
    console.log('in parksSaga');
    
    yield takeEvery('GET_SINGLE_PARK', getSinglePark);
    yield takeEvery('GET_VISIT_PARK', getParkForVisit);
}

export default parksSaga;



