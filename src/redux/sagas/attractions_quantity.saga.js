// attractions_quantity saga for Solo Project App for Prime Academy
// created by Adam Boerhave, November 2020
// contains all sagas required for getting, and saving and incrementing 
// attractions for a certain visit.

import {put, takeEvery} from 'redux-saga/effects';
import axios from 'axios';

// function to get all the attractions previously experienced by the user
function* getAttractionsQuantity(action) {
    try {
        console.log('in getAttractionsQuantity function with parkVisitId', action.payload);
        
        const attractionsQuantityResponse = yield axios.get(`/api/attractionsQuantity/${action.payload}`);
        console.log('attractionsQuantityResponse.data', attractionsQuantityResponse.data);
        // send the attractions and quantities associated with them to the attractionsQuantity reducer
        yield put({type: 'SET_ATTRACTIONS_QUANTITY', payload: attractionsQuantityResponse.data});
    }
    catch (error) {
        console.log('error in getAttractionsQuantity function', error);        
    }
}

// function to post to the database a new attraction that has not been experienced on the visit yet
function* createOneAttractionQuantity(action) {
    try {
        console.log('in createOneAttractionQuantity', action.payload);
        const attractionsQuantityResponse = yield axios.post(`/api/attractionsQuantity`, action.payload);
        console.log('parkVisitId', attractionsQuantityResponse.data.park_visit_id);
        // update attractions quantity to make the reducer current
        yield put({type: 'GET_ATTRACTIONS_QUANTITY', payload: attractionsQuantityResponse.data.park_visit_id});
    }
    catch (error) {
        console.log('error in createOneAttractionQuantiy', error);
    }
}

// function to add to the number of times ridden for a certain attraction that has already been 
// added to the database for visits_attractions for this visit
function* addAttractionQuantity(action) {
    console.log('in addAttractionQuantity', action);
    const addAttractionQuantityResponse = yield axios.put(`/api/attractionsQuantity`, action.payload);
    console.log('parkVisitId', addAttractionQuantityResponse.data.park_visit_id);
    // update attractions quantity to make the reducer current
    yield put({type: 'GET_ATTRACTIONS_QUANTITY', payload: addAttractionQuantityResponse.data.park_visit_id});
}

// watcher saga for attractions quantity sagas
function* attractionsQuantitySaga() {
    console.log('in attractionsSaga');
    
    yield takeEvery('GET_ATTRACTIONS_QUANTITY', getAttractionsQuantity);
    yield takeEvery('POST_ONE_RIDE', createOneAttractionQuantity);
    yield takeEvery('ADD_ONE_RIDE', addAttractionQuantity);
}

export default attractionsQuantitySaga;



