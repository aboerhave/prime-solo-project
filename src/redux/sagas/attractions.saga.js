// attractions saga for Solo Project App for Prime Academy
// created by Adam Boerhave, November 2020
// contains the saga to get all the attractions at a desired theme park

import {put, takeEvery} from 'redux-saga/effects';
import axios from 'axios';

// function to get all the attractions at the park chosen
function* getAttractions(action) {
    try {
        console.log('in getAttractions function with parkId', action.payload);
        
        const attractionsResponse = yield axios.get(`/api/attractions/${action.payload}`);
        console.log('attractionsResponse.data', attractionsResponse.data);
        // send the attractions to the attractions reducer to be saved
        yield put({type: 'SET_ATTRACTIONS', payload: attractionsResponse.data});
    }
    catch (error) {
        console.log('error in getParks function', error);        
    }
}

// watcher saga to watch for GET_ATTRACTIONS action type
function* attractionsSaga() {
    console.log('in attractionsSaga');
    
    yield takeEvery('GET_ATTRACTIONS', getAttractions);
}

export default attractionsSaga;



