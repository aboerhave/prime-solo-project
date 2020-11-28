// visit attractions saga for Solo Project App for Prime Academy
// created by Adam Boerhave, November 2020
// contains the saga to get attractions at a selected park that are displayed

import {put, takeEvery} from 'redux-saga/effects';
import axios from 'axios';

// function to get all the attractions at the park chosen
function* getVisitAttractions(action) {
    try {
        console.log('in getVisitAttractions function with parkVisitId', action.payload);
        console.log('action.payload', action.payload);
        const visitAttractionsResponse = yield axios.get(`/api/visitAttractions/${action.payload}`);
        console.log('visitAttractionsResponse.data', visitAttractionsResponse.data);
        // send them to the visitAttractions reducer
        yield put({type: 'SET_VISIT_ATTRACTIONS', payload: visitAttractionsResponse.data});
    }
    catch (error) {
        console.log('error in getParks function', error);        
    }
}

// watcher saga to watch for GET_ATTRACTIONS_FOR_PARK_VISIT action type
function* visitAttractionsSaga() {
    console.log('in attractionsSaga');
    
    yield takeEvery('GET_ATTRACTIONS_FOR_PARK_VISIT', getVisitAttractions);
}

export default visitAttractionsSaga;



