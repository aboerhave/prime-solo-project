import {put, takeEvery, takeLatest} from 'redux-saga/effects';
import axios from 'axios';

// function to get all the genres from database
function* getSinglePark(action) {
    try {
        console.log('in getSinglePark function with parkId', action.payload);
        
        const singleParkResponse = yield axios.get(`/api/parks/${action.payload}`);
        console.log('singleParkResponse.data', singleParkResponse.data[0]);
        yield put({type: 'SET_SINGLE_PARK', payload: singleParkResponse.data});
    }
    catch (error) {
        console.log('error in getParks function', error);        
    }
}

function* parksSaga() {
    console.log('in parksSaga');
    
    yield takeEvery('GET_SINGLE_PARK', getSinglePark);
}

export default parksSaga;



