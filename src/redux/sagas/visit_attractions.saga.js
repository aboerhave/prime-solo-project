import {put, takeEvery, takeLatest} from 'redux-saga/effects';
import axios from 'axios';

// function to get all the attractions at the park chosen
function* getVisitAttractions(action) {
    try {
        console.log('in getVisitAttractions function with parkVisitId', action.payload);
        console.log('action.payload', action.payload);
        
        const visitAttractionsResponse = yield axios.get(`/api/visitAttractions/${action.payload}`);
        console.log('visitAttractionsResponse.data', visitAttractionsResponse.data);
        yield put({type: 'SET_VISIT_ATTRACTIONS', payload: visitAttractionsResponse.data});
    }
    catch (error) {
        console.log('error in getParks function', error);        
    }
}

function* visitAttractionsSaga() {
    console.log('in attractionsSaga');
    
    yield takeEvery('GET_ATTRACTIONS_FOR PARK_VISIT', getVisitAttractions);
}

export default visitAttractionsSaga;



