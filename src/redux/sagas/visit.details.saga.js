import {put, takeEvery, takeLatest} from 'redux-saga/effects';
import axios from 'axios';

// function to get all the attractions at the park chosen
function* getVisitDetails(action) {
    try {
        console.log('in getVisitDetails function with parkVisitId', action.payload);
        
        const visitDetailsResponse = yield axios.get(`/api/visitDetails/${action.payload}`);
        console.log('visitDetailsResponse.data', visitDetailsResponse.data);
        yield put({type: 'SET_VISIT_DETAILS', payload: visitDetailsResponse.data});
    }
    catch (error) {
        console.log('error in getParks function', error);        
    }
}

function* visitDetailsSaga() {
    console.log('in visitDetailsSaga');
    
    yield takeEvery('GET_VISIT_DETAILS', getVisitDetails);
}

export default visitDetailsSaga;


