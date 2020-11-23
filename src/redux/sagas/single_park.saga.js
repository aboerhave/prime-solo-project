import {put, takeEvery} from 'redux-saga/effects';
import axios from 'axios';

// function to get all the genres from database
function* getSinglePark(action) {
    try {
        console.log('in getSinglePark function with parkId', action.payload);
        
        const singleParkResponse = yield axios.get(`/api/parks/${action.payload}`);
        console.log('singleParkResponse.data', singleParkResponse.data[0]);
        yield put({type: 'SET_SINGLE_PARK', payload: singleParkResponse.data[0]});
    }
    catch (error) {
        console.log('error in getSinglePark function', error);        
    }
}

function* getParkForVisit(action) {
    try {
        console.log('in getParkForVisit function', action.payload);
        const parkVisitResponse = yield axios.get(`/api/visitPark/${action.payload}`);
        console.log('parkVisitResponse', parkVisitResponse.data);
        yield put({type: 'SET_VISIT_PARK', payload: parkVisitResponse.data[0]});
        
    }
    catch(error) {
        console.log('error in getParkForVisit funciton', error );
        
    }
}

function* parksSaga() {
    console.log('in parksSaga');
    
    yield takeEvery('GET_SINGLE_PARK', getSinglePark);
    yield takeEvery('GET_VISIT_PARK', getParkForVisit);
}

export default parksSaga;



